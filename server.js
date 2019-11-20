if (process.argv[2] === 'local') {
  // load .env data into process.env
  require('dotenv').config();
}

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV  || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const sass       = require("node-sass-middleware");
const app        = express();
const longpoll   = require("express-longpoll")(app);
const morgan     = require('morgan');
const path       = require('path');

// PG database client/connection setup
// const { Pool } = require('pg');
const db = require('./server/db.js');
// const db = new Pool(dbParams);
// db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieSession({
  name: 'session',
  keys: ['key1']
}));

app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));

app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const restaurantsRoutes = require("./routes/restaurants");
const ordersRoutes = require("./routes/orders");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/restaurants", restaurantsRoutes(db));
app.use("/orders", ordersRoutes(db));
// Note: mount other resources here, using the same pattern above

// Creates app.get("/poll") for the long poll
longpoll.create("/poll");


app.use(express.static(path.join(__dirname, './public')));


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});


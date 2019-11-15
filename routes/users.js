/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};

const login =  function(email, password) {
  return database.getUserWithEmail(email)
  .then(user => {
    if (bcrypt.compareSync(password, user.password)) {
      return user;
    }
    return null;
  });
}
exports.login = login;


router.post('/login', (req, res) => {
  const {email, password} = req.body;
  login(email, password)
    .then(user => {
      if (!user) {
        res.send({error: "error"});
        return;
      }
      req.session.userId = user.id;
      res.send({user: {name: user.name, email: user.email, id: user.id}});
    })
    .catch(e => res.send(e));
});


router.post('/logout', (req, res) => {
  req.session.userId = null;
  res.send({});
});

// create this function for this route to work

// if the user is logged in, this sends the user object by checking for cookies
//
// redirects the object to the client which the header template uses
// with getmydetails to hide the login button and show relevant user name

router.get("/me", (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    res.send({message: "not logged in"});
    return;
  }

database.getUserWithId(userId)
.then(user => {
  if (!user) {
    res.send({error: "no user with that id"});
    return;
  }

  res.send({user: {name: user.name, email: user.email, id: userId}});
})
.catch(e => res.send(e));
});


/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const database = require('../server/database.js');
const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');

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

  //create new user on post to /api/users/
  router.post("/", (req, res) => {
    const { email, name, password, phone } = req.body;
    console.log(req.body);
    //TODO: implement checks for valid user input.
    db.query(`INSERT INTO users(email, name, password, phone) VALUES ($1, $2, $3, $4) RETURNING *`, [email, name, password, phone])
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

  router.post('/', (req, res) => {
    const user = req.body;
    user.password = bcrypt.hashSync(user.password, 12);
    database.addUser(user)
    .then(user => {
      if (!user) {
        res.send({error: "error"});
        return;
      }
      req.session.userId = user.id;
      res.send("Successfully registered!");
    })
    .catch(e => res.send(e));
  });

  // Login route expects email, password in request body from a client post request.
  // query the database based on matching email, then check if user exists and
  // provided password matches record
  // router.post('/login', async (req, res) => {
  //   const { email, password } = req.body;
  //   try {
  //     if (email) {
  //       // this query currently does not escape SQL injection or javascript inputs
  //       const dbRes = await db.query(`SELECT * FROM users WHERE email = '${email}';`);
  //       const user = dbRes.rows[0];
  //       // need to compare with bcrypt instead
  //       if (user && user.password === password) {
  //         req.session.userId = user.id;
  //         res.status(200).send({ user: { name: user.name, id: user.id, email: user.email } });
  //       } else {
  //         throw new Error ('Authentication failed');
  //       }
  //     } else {
  //       throw new Error ('Login input field is empty');
  //     }
  //   } catch (e) {
  //     res.status(400).send({ user: {}, message: `login failed! ${e}`});
  //   }
  // });

  router.post('/logout', (req, res) => {
    req.session.userId = null;
    res.sendStatus(200);
  })

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

  return router;
};







// router.post('/logout', (req, res) => {
//   req.session.userId = null;
//   res.send({});
// });

// create this function for this route to work

// if the user is logged in, this sends the user object by checking for cookies
//
// redirects the object to the client which the header template uses
// with getmydetails to hide the login button and show relevant user name




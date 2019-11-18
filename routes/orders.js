/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const database = require('../server/database.js');
const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    let query = `SELECT * FROM restaurants`;
    console.log(query);
    db.query(query)
      .then(data => {
        const widgets = data.rows;
        res.json({ widgets });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


  router.post('/', async (req, res) => {
    const { userId } = req.session;
    const { order } = req.body;
    res.sendStatus(200)
    database.addOrder(userId, order)
    .then(res => console.log(res))
  })
  return router;
};

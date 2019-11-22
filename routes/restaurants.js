/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  const database = require('../server/database.js')(db);

  router.get("/", (req, res) => {
    let query = `SELECT * FROM restaurants`;
    console.log(query);
    db.query(query)
      .then(data => {
        const restaurantss = data.rows;
        res.json({ restaurantss });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/add", (req, res) => {

  })

  router.post("/me", (req, res) => {
    let resId = req.body;
    database.getMenu(parseInt(resId.data))
      .then(foods => {
        if (!foods) {
          res.send({error : "no restaurant with that id"});
          return;
        }
        let menu = [];
        for (let item of foods) {
          menu.push(item);
        }
        res.send({menu})
        // res.send({menu: {restaurant_id: foods[0].restaurant_id, name: foods[0].name, photo_url: foods[0].photo_url, description: foods[0].description, price: foods[0].price}})
      })
      .catch(err => res.send(err));
  });

  router.post('/info', (req, res) => {
    let info = {};
    database.getRestaurantWithId(req.body.data)
      .then(dbres => {
        info.id = dbres.id;
        info.title = dbres.title;
        info.phone = dbres.phone;
        info.email = dbres.email;
        res.send(info);
      });
    });

    router.get('/all', (req, res) => {
      database.getRestaurants()
        .then(dbres => {
          res.send(dbres)
        })
    })


  return router;
};

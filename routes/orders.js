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

  /* Route to get individual order */
  router.get('/:id', (req, res) => {
    const orderId = req.params.id;
    const userId = req.session.userId;
    if (userId && orderId) {
    database.getOrder(orderId)
      .then(dbres => res.send({ orders: dbres.rows }))
      .catch(err => res.status(500).send({ message: err }));
    return;
    }
    res.status(406).send({message: 'Failed retrieving the order'});
  });


  /* Route to update an individual order status*/
  router.post('/:id', (req, res) => {
    const restaurantId = req.session.userId;
    const orderId = req.params.id;
    const status = req.body;

    if(restaurantId && orderId) {

    }

  });


  /* Route to create an new Order
  request format should be:
  { restaurant_id : 1,                       
    ordersItem    : [ {foodid: 1, quantity: 1},                  
                      {foodid: 3, quantity: 2}     
                    ] 
  }
  */
  router.post('/', (req, res) => {
    const { userId } = req.session;
    const { order } = req.body;
    if (userId && order) {
    database.addOrder(userId, order)
      .then(dbres => res.send({ orders: dbres.rows }))
      .catch(err => res.status(500).send({ message: err }));
    return;
    }
    res.status(406).send({message: 'Failed placing the order'});
  })


  /* Route to get all the Orders from restaurant-id */
  router.get('/', (req, res) => {
    const restaurantId = req.session.userId;
    if (restaurantId) {
    database.getAllOrders(restaurantId)
      .then(dbres => res.send({ orders: dbres.rows }))
      .catch(err => res.status(500).send({ message: err }));
    return;
    }
    res.status(406).send({ message: 'You are not logged in as restaurant'});
  })
  

  return router;
};

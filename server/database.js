// this file should contain all database related helper functions that query the DB
const db = require('./db.js');

// User based queries and insertions

const getUserWithId = function(id) {
  return db.query(`
    SELECT *
    FROM users
    WHERE id=$1
  `, [id])
  .then(res => res.rows ? res.rows[0] : null);
}
// exports.getUserWithId = getUserWithId;

const getUserWithEmail = function(email) {
  return db.query(`
    SELECT *
    FROM users
    WHERE email=$1
  `, [email])
  .then(res => res.rows.length > 0 ? res.rows[0] : getRestaurantWithEmail(email));
}
// exports.getUserWithEmail = getUserWithEmail;

const addUser =  function(user) {
  const insert = `
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3) RETURNING *
    `;
  return db.query(insert, [user.name, user.email, user.password])
    .then(res => res.rows ? res.rows[0] : null);
}

const addOrder =  function(userId, order) {
  const { restaurant_id, items } = order;
  const insert = `
    INSERT INTO orders (restaurant_id, users_id)
    VALUES ($1, $2) RETURNING *
    `;
  return db.query(insert, [restaurant_id, userId])
    .then(res => res.rows ? res.rows[0] : null);
}

// Restaurant based queries and responses

const getRestaurantWithEmail = function(email) {
  return db.query(`
    SELECT *
    FROM restaurants
    WHERE email=$1;
  `, [email])
  .then(res => res.rows ? res.rows[0] : null);
}

const getRestaurantWithId = function(id) {
  return db.query(`
    SELECT *
    FROM restaurants
    WHERE id=$1
  `, [id])
  .then(res => res.rows ? res.rows[0] : null);
}

const getMenu = function(resId) {
  return db.query(`
  SELECT *
  FROM foods
  WHERE restaurant_id=$1;
  `, [resId])
  .then(res => res.rows ? res.rows : null);
}

module.exports = { getUserWithId, getUserWithEmail, addUser, addOrder, getMenu, getRestaurantWithId };

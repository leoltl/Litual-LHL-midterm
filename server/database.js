// this file should contain all database related helper functions that query the DB
const db = require('./db.js');


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
  .then(res => res.rows ? res.rows[0] : null);
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
// exports.addUser = addUser;

module.exports = { getUserWithId, getUserWithEmail, addUser };

const { Pool } = require('pg');

const dbParams = require('../lib/db.js');
const db = new Pool(dbParams);

console.log('db.js file')

module.exports = {
  query: (text, params, callback) => {
    return db.query(text, params, callback)
  },
};

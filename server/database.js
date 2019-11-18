const getUserWithId = function(id) {
  return db.query(`
    SELECT *
    FROM users
    WHERE id=$1
  `, [id])
  .then(res => res.rows ? res.rows[0] : null);
}
exports.getUserWithId = getUserWithId;

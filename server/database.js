// this file should contain all database related helper functions that query the DB

// User based queries and insertions
module.exports = (db) => {
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
  console.log('in database user', user)
  const insert = `
    INSERT INTO users (name, email, password, phone)
    VALUES ($1, $2, $3, $4) RETURNING *
    `;
  return db.query(insert, [user.name, user.email, user.password, parseInt(user.phone)])
    .then(res => res.rows ? res.rows[0] : null);
}

const addOrder =  async function (userId, order) {
  try {
    const { restaurant_id } = order;
    //create a order record in order table and return the order id back for later use
    const orderTableinsert = `
    INSERT INTO orders (restaurant_id, user_id)
    VALUES ($1, $2) RETURNING orders.id
    `;
    const dbRes = await db.query(orderTableinsert, [restaurant_id, userId]);
    const orderID = dbRes.rows[0].id;

    // insert the order into orderItem bridge table
    const { orderItems } = order;
    const insertValues = orderItems.map(item => `('${orderID}', '${item.foodid}', '${item.quantity}')`).join(',');
    const fullQuery = `
    INSERT INTO orderItems (order_id, food_id, quantity)
    VALUES
    ${insertValues} RETURNING *;
    `
    return db.query(fullQuery);
  } catch (e) {
    console.log(e);
  }
}

const getAllOrders = function (restaurant_id) {
  return db.query(`
    SELECT orderItems.order_id, orderItems.quantity, orders.status, orders.user_id, foods.name, foods.id AS food_id FROM orders
    JOIN orderItems ON (orders.id = orderItems.order_id)
    JOIN foods ON (orderItems.food_id = foods.id)
    WHERE orders.restaurant_id = $1;` ,[restaurant_id])
}

const getOrder = function(order_id) {
  return db.query(`
    SELECT * FROM orders
    JOIN orderItems ON (orders.id = orderItems.order_id)
    JOIN foods ON (orderItems.food_id = foods.id)
    WHERE orders.id = $1;
    `, [order_id])
}

const updateOrderStatus = function(order_id, status) {
  return db.query(`
  UPDATE orders
  SET status = $2
  WHERE orders.id = $1;
  `, [order_id, status])
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

const getRestaurants = function() {
  return db.query(`
  SELECT id, title, phone, email, image
  FROM restaurants;`)
    .then(res => res.rows ? res.rows : null);
}

return { getUserWithId, getUserWithEmail, addUser, addOrder, getMenu, getRestaurantWithId, getAllOrders,
  getOrder,
  updateOrderStatus,
  getRestaurants };
}


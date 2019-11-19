/*
  this is a template for new orders coming in to a restaurant
  this contains all the items and quntities of a user's order
  there will be a confirm and deny button at the bottom
  in order to confirm, res must input an approx wait time

  if rejected, the order's status is set to rejected, and deleted set to true
  the user recieves a text in either case
*/

function renderOrder () {
  // hard coded to restaurant id 1;
  findOrders(1)
    .then(res => groupByOrderID(res.orders))
    .then(orders => {
      orders.forEach(order => createOrderCard(order))});
}

function groupByOrderID (orderItems) {
  let groupedOrders = {}
  orderItems.forEach(item => {
    if (groupedOrders[item.order_id]) {
      groupedOrders[item.order_id][item.name] = item.quantity;
      groupedOrders[item.order_id]['status'] = item.status;
      groupedOrders[item.order_id]['order_id'] = item.order_id;
    } else {
      obj = {}
      obj[item.name] = item.quantity
      obj['status'] = item.status;
      obj['order_id'] = item.order_id;
      groupedOrders[item.order_id] = obj;
    }
  });
  return Object.values(groupedOrders);
};

function createOrderCard (order) {
  orderItems = "";
  Object.keys(order).forEach(key => {
    if (key !== "status" && key !== "order_id") {
      orderItems += (`<li class="list-group-item">${key}<span class="quantity">x${order[key]}</span></li>`)
    }
  });

  $(`${order.status === "pending" ? '#pending' : '#accepted'}`).append($(`<article class="order-card card">
              <div class="card-body" id="${order.order_id}">
                <h5 class="card-title">Order #${order.order_id}<span>${order.status}</span></h5>
              </div>
              <ul class="list-group list-group-flush">
                ${orderItems}
              </ul>
              <div class="card-footer">
                <button class="card-link call-to-action">SURE</button>
                <a href="#" class="card-link">NOPE</a>
              </div>
            </article>
            `));
}

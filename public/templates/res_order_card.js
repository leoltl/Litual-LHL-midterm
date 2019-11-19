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

  if (order.status === 'rejected' || order.status === 'done') return;

  $(`${order.status === "pending" ? '#pending' : '#accepted'}`).append($(`<article class="order-card card">
              <div class="card-body" data-id="${order.order_id}">
                <h5 class="card-title">Order #${order.order_id}<span>${order.status}</span></h5>
              </div>
              <ul class="list-group list-group-flush">
                ${orderItems}
              </ul>
              <div class="card-footer">
                <button id="accept" class="card-link call-to-action">ACCEPT</button>
                <form class="hidden">
                  <input type="number" name="time" min="1" max="30">
                  <input type="submit" name="order-accept" value="Confirm">
                </form>
                <button data-reject="${order.order_id}" id="reject-btn" class="card-link">REJECT</button>
              </div>
            </article>
            `));
}

$("main").on('click', '#accept', function(event) {
  event.preventDefault();
  $(this).siblings('form').toggleClass('hidden');
});

$("main").on('click', '#reject-btn', function(event) {
  event.preventDefault();
  console.log($(this).data('reject'));
  let order_id = $(this).data('reject');
  updateOrder(order_id, 'rejected')
    .then(() => views_manager.show('res_order_viewer'));

});


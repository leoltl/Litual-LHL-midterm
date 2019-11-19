/*
  this is the page a restaurant will see once they are logged in
  this will show a two clumn table showing pending and accepted orders
  order cards will be appended to the left side of the page, while accepted orders will be moved to the right side
*/

$(() => {

  const $res_order_viewer = $(`
      <!-- start res-order_viewer component -->
      <section class="order-viewer">
        <h2>RESTAURANT NAME - Order List</h2>
          <div class="col-wrapper">
          <!-- start res-order_col component -->
          <div id="pending" class="order-column">
              <h3>Pending</h3>
              <hr/>
          </div>
          <div id="accepted" class="order-column">
              <h3>Accepted</h3>
              <hr/>
          </div>
      </section>
  `);

  
  
  window.$res_order_viewer = $res_order_viewer;
  $('main').append($res_order_viewer);
});

function groupByOrderID (orders) {
  let groupedOrders = {}
  orders.forEach(order => {
    if (groupedOrders[order.order_id]) {
      groupedOrders[order.order_id][order.name] = order.quantity;
      groupedOrders[order.order_id]['status'] = order.status;
      groupedOrders[order.order_id]['order_id'] = order.order_id;
    } else {
      obj = {}
      obj[order.name] = order.quantity
      obj['status'] = order.status;
      obj['order_id'] = order.order_id;
      groupedOrders[order.order_id] = obj;
    }
  });

  return groupedOrders;
}

function createOrderCard (order) {
  orderItems = "";
  Object.keys(order).forEach(key => {
    if (key !== "status" && key !== "order_id") {
      orderItems += (`<li class="list-group-item">${key}<span class="quantity">x${order[key]}</span></li>`)
    }
  });

  order.status === "pending" ? '#pending' : '#accepted';
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

function renderOrder () {
  findOrder(1)
    .then(res => groupByOrderID(res.orders))
    .then(results => {
      Object.keys(results).forEach(key => {
        createOrderCard(results[key], key);
      })
    
    });
}
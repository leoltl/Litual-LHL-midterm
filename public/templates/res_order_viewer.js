// /*
//   this is the page a restaurant will see once they are logged in
//   this will show a two clumn table showing pending and accepted orders
//   order cards will be appended to the left side of the page, while accepted orders will be moved to the right side
// */

// $(() => {
//   const $res_order_viewer = $(`
//       <!-- start res-order_viewer component -->
//       <section class="order-viewer">
//         <h2>RESTAURANT NAME - Order List</h2>
//         <div class="col-wrapper">
//         <!-- start res-order_col component -->
//         <div id="pending" class="order-column">
//             <h3>Pending</h3>
//             <hr/>
//         </div>
//         <div id="accepted" class="order-column">
//             <h3>Accepted</h3>
//             <hr/>
//         </div>
//       </section>
//   `);

//   window.$res_order_viewer = $res_order_viewer;
//   $('main').append($res_order_viewer);

//   function addOrderCard(orderCard){
//     console.log('addordercard', orderCard, orderCard.status, orderCard.html);
//     // $(`#${orderCard.status}`).append(`${orderCard.html}`)
//   }

//   function clearOrders() {
//     $res_order_viewer.children('div').empty();
//   }
//   window.$res_order_viewer.clearOrders = clearOrders;
  
//   function renderOrders(orders) {
//     clearOrders();
//     // console.log(orders);
//     const ordersArray = groupByOrderID(orders);
//     console.log(ordersArray)
//     for(const orderID in ordersArray) {
//       const order = ordersArray[orderID];
//       console.log(order);
//       const orderCard = $res_order_viewer.createOrderCard(order)
//       console.log(orderCard);
//       addOrderCard(orderCard);
//     }
//   }
//   window.$res_order_viewer.renderOrders = renderOrders;
  
//   // function renderOrder () {
// //   // hard coded to restaurant id 1;
// //   findOrders(1)
// //     .then(res => groupByOrderID(res.orders))
// //     .then(orders => {
// //       orders.forEach(order => createOrderCard(order))});
// // }

// function groupByOrderID (orderItems) {
//   let groupedOrders = {}
//   orderItems.forEach(item => {
//     if (groupedOrders[item.order_id]) {
//       groupedOrders[item.order_id][item.name] = item.quantity;
//       groupedOrders[item.order_id]['status'] = item.status;
//       groupedOrders[item.order_id]['order_id'] = item.order_id;
//       groupedOrders[item.order_id]['user_id'] = item.user_id;
//     } else {
//       obj = {}
//       obj[item.name] = item.quantity
//       obj['status'] = item.status;
//       obj['order_id'] = item.order_id;
//       obj['user_id'] = item.user_id;
//       groupedOrders[item.order_id] = obj;
//     }
//   });
//   return Object.values(groupedOrders);
// };

// });

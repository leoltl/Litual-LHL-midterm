// /*
//   this is a template for new orders coming in to a restaurant
//   this contains all the items and quntities of a user's order
//   there will be a confirm and deny button at the bottom
//   in order to confirm, res must input an approx wait time

//   if rejected, the order's status is set to rejected, and deleted set to true
//   the user recieves a text in either case
// */

// $(() => {
//   function createOrderCard (order) {
//     console.log("coc", order);
//     orderItems = "";
//     Object.keys(order.items).forEach(key => {
//       console.log(key);
//       if (key !== "status" && key !== "order_id" && key !== "user_id") {
//         orderItems += (`<li class="list-group-item">${key}<span class="quantity">x${order.items[key]}</span></li>`)
//       }
//     });
  
//     if (order.status === 'rejected' || order.status === 'done') return;

//     const status = order.status;
//     const html = `<article class="order-card card">
//     <div class="card-body" data-id="${order.order_id}">
//       <h5 class="card-title">Order #${order.order_id}<span>${order.status}</span></h5>
//     </div>
//     <ul class="list-group list-group-flush">
//       ${orderItems}
//     </ul>
//     <div class="card-footer">
//     ${order.status === 'pending' ? `<button id="accept" class="card-link call-to-action">ACCEPT</button>
//     <form class="hidden">
//       <input id="estimated" type="number" name="time" min="1" max="30">
//       <input type="submit" data-submit="${order.order_id}" data-user="${order.user_id}" id="submit-btn" name="order-accept" value="Confirm">
//     </form>
//     <button data-reject="${order.order_id}" data-user="${order.user_id}" id="reject-btn" class="card-link">REJECT</button>
//     ` : `<button data-done="${order.order_id}" data-user="${order.user_id}" id="done-btn" class="card-link call-to-action">Ready</button>`}
//     </div>
//   </article>
//   `
//   console.log(status, html);
//     return {status, html};
//   }
//   window.$res_order_viewer.createOrderCard = createOrderCard;

//   $("main").on('click', '#accept', function(event) {
//     event.preventDefault();
//     $(this).siblings('form').toggleClass('hidden');
//   });
  
//   $("main").on('click', '#reject-btn', function(event) {
//     event.preventDefault();
//     console.log($(this).data('reject'));
//     let data = {};
//     data.order_id = $(this).data('reject');
//     data.user_id = $(this).data('user').toString();
//     $('.order-card').empty();
//     updateOrder(data, 'rejected')
//       .then(res => renderOrder());
//   });
  
//   $("main").on('click', '#submit-btn', function(event) {
//     event.preventDefault();
//     console.log($(this).data('submit'));
//     let data = {};
//     data.order_id = $(this).data('submit');
//     data.user_id = $(this).data('user');
//     data.estimate = $('#estimated').val();
//     console.log(typeof data.estimate, data.estimate)
//     $('.order-card').empty();
//     updateOrder(data, 'accepted')
//       .then(res => renderOrder());
//   });
  
//   $("main").on('click', '#done-btn', function(event) {
//     event.preventDefault();
//     console.log($(this).data('done'));
//     let data = {};
//     data.order_id = $(this).data('done');
//     data.user_id = $(this).data('user');
//     $('.order-card').empty();
//     updateOrder(data, 'done')
//       .then(res => renderOrder());
//   });
// })







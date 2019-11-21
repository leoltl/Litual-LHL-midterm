$(() => {

  const $order_view = $(`
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

  window.$order_view = $order_view;
  $('main').append($order_view);

  function clearOrders() {
    $('.order-card').remove();
  }

  function renderOrders(ordersRes) {
    $("footer").hide();
    poll();
    clearOrders();
    const ordersArr = [...ordersRes.orders]
    const pendingOrders = ordersArr.filter(order => order.status === 'pending');
    const acceptedOrders = ordersArr.filter(order => order.status === 'accepted');
    pendingOrders.forEach(order => addCardToDom(createOrderCard(order), '#pending'));
    acceptedOrders.forEach(order => addCardToDom(createOrderCard(order), '#accepted'));
  }


  var poll = function () {
    $.ajax({
      url:'poll',
      success: function(data) {
        findOrders(1).then(res => $order_view.renderOrders(res));
        poll();
      },
      error: function() {
        poll();
      },
      timeout: 30000
    })
  };

  window.$order_view.renderOrders = renderOrders;

  function addCardToDom(el, domSelector) {
    $(`${domSelector}`).append(el);
  }

  function createOrderCard(order) {
      orderItems = "";
      Object.keys(order.items).forEach(key => {
        orderItems += (`<li class="list-group-item">${key}<span class="quantity">x${order.items[key]}</span></li>`)
      });
      return `<article class="order-card card">
                      <div class="card-body" data-id="${order.order_id}">
                        <h5 class="card-title">Order #${order.order_id}<span>${order.status}</span></h5>
                      </div>
                      <ul class="list-group list-group-flush">
                        ${orderItems}
                      </ul>
                      <div class="card-footer d-flex justify-content-sm-between">
                      ${order.status === 'pending' ? `<button id="accept" class="btn btn-success">ACCEPT</button>
                      <form class="hidden" id="accept-form">
                        <input class="btn rounded-pill border" id="estimated" type="number" name="time" min="1" max="30" value="5">
                        <input type="submit" data-submit="${order.order_id}" data-user="${order.user_id}" id="submit-btn" name="order-accept" value="CONFIRM" class="btn btn-success">
                      </form>
                      <button data-reject="${order.order_id}" data-user="${order.user_id}" id="reject-btn" class="btn btn-danger">REJECT</button>
                      ` : `<button data-done="${order.order_id}" data-user="${order.user_id}" id="done-btn" class="btn btn-success ml-auto">READY</button>`}
                      </div>
                    </article>
                    `
  }


  $("main").on('click', '#accept', function(event) {
    event.preventDefault();
    $(this).siblings('form').toggleClass('hidden');
    $(this).toggleClass('btn-success btn-warning');
    $(this).html() === 'ACCEPT' ? $(this).html('CANCEL') : $(this).html('ACCEPT');
  });

  $("main").on('click', '#reject-btn', function(event) {
    event.preventDefault();
    console.log($(this).data('reject'));
    let data = {};
    data.order_id = $(this).data('reject');
    data.user_id = $(this).data('user').toString();
    $('.order-card').empty();
    updateOrder(data, 'rejected')
      .then(res => renderOrderView());
  });

  $("main").on('click', '#submit-btn', function(event) {
    event.preventDefault();
    console.log($(this).data('submit'));
    let data = {};
    data.order_id = $(this).data('submit');
    data.user_id = $(this).data('user');
    data.estimate = $('#estimated').val();
    console.log(typeof data.estimate, data.estimate)
    $('.order-card').empty();
    updateOrder(data, 'accepted')
      .then(res => renderOrderView());
  });

  $("main").on('click', '#done-btn', function(event) {
    event.preventDefault();
    console.log($(this).data('done'));
    let data = {};
    data.order_id = $(this).data('done');
    data.user_id = $(this).data('user');
    $('.order-card').empty();
    updateOrder(data, 'done')
      .then(res => renderOrderView());
  });
})

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

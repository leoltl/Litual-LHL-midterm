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
                <!-- start res_order_card component -->
                <article class="order-card card">
                  <div class="card-body">
                    <h5 class="card-title">Order # 235</h5>
                  </div>
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">Cras justo odio<span class="quantity">x1</span></li>
                    <li class="list-group-item">Dapibus ac facilisis in<span class="quantity">x1</span></li>
                    <li class="list-group-item">Vestibulum at eros<span class="quantity">x1</span></li>
                  </ul>
                  <div class="card-footer">
                    <button class="card-link call-to-action">SURE</button>
                    <a href="#" class="card-link">NOPE</a>
                  </div>
                </article>
                <!-- end res_order_card component -->
            </div>
  `)

  window.$res_order_viewer = $res_order_viewer;
  $('main').append($res_order_viewer);

});

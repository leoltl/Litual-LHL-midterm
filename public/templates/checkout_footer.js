/*
  this will pop up once any one of the items has been added to cart
  this will redirect to the checkout page with a list of the items and quntities selected
*/
$(() => {
  window.footer = {};

  const $pageFooter = $('.checkout-footer');

  function updateFooter() {
    footer = $(`<p>items in cart: 0</p>
    <button class="cart">Go To Cart</button>`);

    $pageFooter.append(footer);
  }

  updateFooter();

  $("footer .cart").on('click', function(event) {
    event.preventDefault();
    $("footer").hide();
    views_manager.show("checkout");
  });

});

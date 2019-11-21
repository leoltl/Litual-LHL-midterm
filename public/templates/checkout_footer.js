/*
  this will pop up once any one of the items has been added to cart
  this will redirect to the checkout page with a list of the items and quntities selected
*/
$(() => {
  window.footer = {};

  const $pageFooter = $('.checkout-footer');

  function updateFooter() {
    footer = $(`

    <a class="cart"><i class="fas fa-shopping-cart"></i></a>
    <p>0</p>
    `);

    $pageFooter.append(footer);
  }

  updateFooter();
});

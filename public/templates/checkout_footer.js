/*
  this will pop up once any one of the items has been added to cart
  this will redirect to the checkout page with a list of the items and quntities selected
*/
$(() => {
  window.footer = {};

  const $pageFooter = $('.checkout-footer');
  let currentUser = null;
  function updateFooter(user) {
    currentUser = user;
    if (!user) {
      footer = $(`<p>items in cart: 0</p>
      <button class="cart">Go To Cart</button>`);
    } else {
      footer = "" //TOADD
    }
    $pageFooter.append(footer);
  }

  updateFooter(undefined);

});

$(() => {

  const $main = $('#main-content');

  window.views_manager = {};

  window.views_manager.show = function(item, data) {

    // need to add logic to checkout footer to check if there are items already ***MVP***
    // if so, do not detach, but route it to the update footer case ***STRETCH***
    // $checkout_footer.detach();

    // these three detach upon any navigation from their respective pages
    /* $checkout_footer.detach();
    $checkout_item.detach();

    $confirmation.detach();

    // DO NOT detach if item = add_item
    $food_options.detach();

    // ONLY detach if deny, accept or order completed has been pressed
    // need to make sure other routes don't force detach this
    $res_order_card.detach();

    // this one should only detach if the restaurant logs out
    $res_order_viewer.detach();

    // this should only detach when navigating to cart
    // $restaurant_carousel.detach(); ***STRETCH***

    // this should only detach on checkout
    // or ***STRETCH*** when picking a new restaurant and rerendering the name
    $restaurant_listing.detach();

    switch (item) {
      // both cart and checkout footer should trigger this
      case 'checkout':
        $checkout_page.appendTo($main);
        break;
      case 'place_order':
        $confirmation.appenTo($main);
        break;
      case 'add_item':
        // only show the footer if there were no items previously
        // control the logic in the source for 'add_item'
        $checkout_footer.appendTo($main);
        break;
      case 'update_footer':
        // should send this to a route that updates the display of the checkout footer
        // ***STRETCH***
        break;
      case 'accept_order':
        // will need to specify which part exactly from within res_order_viewer
        $res_order_card.appendTo($res_order_viewer);

      // case 'food_options':
      //   data.restaurant_id = $restaurant.restaurant_id;
      //   $food_options.appendTo($main);
      //   break;
      case '':

    $restaurant_carousel.detach();
    $restaurant_listing.detach(); */
    $logInForm.detach();
    // $food_options.detach();
    $('#main-content .food-option').hide();
    $('#restaurant-listing').hide();
    $order_view.detach();
    $checkout_page.detach();
    $signUpForm.detach();

    switch (item) {
      case 'food_options':
        // data.restaurant_id = $restaurant.restaurant_id;
        $('#main-content .food-option').show();
        $('#restaurant-listing').show();
        break;
      case 'logIn':
        $logInForm.appendTo($main);
        break;
      case 'checkout':
        loadCheckoutPage();
        $checkout_page.appendTo($main);
        break;
      case 'signUp':
        $signUpForm.appendTo($main);
        break;
      case 'order_view':
        $order_view.appendTo($main);
        break;
      case 'error': {
        const $error = $(`<p>${arguments[1]}</p>`);
        $error.appendTo('body');
        setTimeout(() => {
          $error.remove();
          views_manager.show('listings');
        }, 2000);
        break;
      }
    }
  }

});

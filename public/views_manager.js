$(() => {

  const $main = $('#main-content');

  window.views_manager = {};

  window.views_manager.show = function(item, data) {
    /* $checkout_footer.detach();
    $checkout_item.detach();
    $checkout_page.detach();
    $confirmation.detach();

    $res_order_card.detach();
    $res_order_viewer.detach();
    $restaurant_carousel.detach();
    $restaurant_listing.detach(); */
    $logInForm.detach();
    $food_options.detach();

    switch (item) {
      case 'food_options':
        //data.restaurant_id = $restaurant.restaurant_id;
        $food_options.appendTo($main);
        break;
      case 'logIn':
        $logInForm.appendTo($main);
        break;
      case 'reservations':

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

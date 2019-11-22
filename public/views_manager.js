$(() => {

  const $main = $('#main-content');

  window.views_manager = {};

  window.views_manager.show = function(item, data) {


    $logInForm.detach();

    $('#main-content .food-option').remove();
    $('#restaurant-listing').remove();
    $order_view.detach();
    $checkout_page.detach();
    $signUpForm.detach();
    $res_carousel.detach();


    switch (item) {
      case 'food_options':
        $res_carousel.prependTo($main)
        displayRes()
        .then(show_main());
        // data.restaurant_id = $restaurant.restaurant_id;

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

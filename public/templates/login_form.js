$(() => {

  const $logInForm = $(`
  <form id="login-form" class="login-form">
      <p>Login</p>
      <div class="login-form__field-wrapper">
        <input type="email" name="email" placeholder="Email">
      </div>

      <div class="login-form__field-wrapper">
          <input type="password" name="password" placeholder="Password">
        </div>

      <div class="login-form__field-wrapper">
          <button>Login</button>
          <a id="login-form__cancel" href="#">Cancel</a>
      </div>
    </form>
  `);

  window.$logInForm = $logInForm;

  $logInForm.on('submit', function(event) {
    event.preventDefault();

    const data = $(this).serialize();
    console.log(data);
    logIn(data)
      .then(json => {
        if (!json.user) {
          console.log( "!!!!",json.user);
          views_manager.show('error', 'Failed to login');
          return;
        }
        console.log(json.user.title);
        header.update(json.user);
        localStorage.setItem("logIn", "true");
        if (json.user.title !== undefined)  {
          findOrders(1).then(res => $order_view.renderOrders(res));
          views_manager.show('order_view');
          localStorage.setItem('res', `${json.user.id}`)

        } else {
          views_manager.show('food_options');
          localStorage.removeItem('res');
        }
      });
  });

  $('body').on('click', '#login-form__cancel', function() {
    event.preventDefault();
    views_manager.show('food_options');
    let totalItemsInCart = 0;
    let i = 1;
    while (true) {
      if (localStorage[`item${i}Quantity`]) {
        totalItemsInCart += parseInt(localStorage[`item${i}Quantity`]);
        i++;
      } else {
        break;
      }
    }
    //let totalItemsInCart = parseInt(localStorage["item1Quantity"]) + parseInt(localStorage["item2Quantity"]) + parseInt(localStorage["item3Quantity"]);
    $("footer p").text(`items in cart: ${totalItemsInCart}`);
    $("footer").show();
    // views_manager.show('food_options');
    // $logInForm.detach();
    // return false;
  });

});

// function logIn(data) {
//   return $.ajax({
//     method: "POST",
//     url: "/api/users/login",
//     data
//   });
// }

$(() => {

  const $logInForm = $(`
  <form id="login-form" class="login-form text-center border border-light p-5">
      <p class="h4 mb-4">Login</p>
        <div class="login-forms">
          <input id="defaultLoginFormEmail" class="d-flex justify-content-center form-control mb-4" type="email" name="email" placeholder="Email">
        </div>
        <div class="login-forms">
          <input id="defaultLoginFormPassword" class="form-control mb-4" type="password" name="password" placeholder="Password">
        </div>
        <button id="login-form-login-btn" class="login-forms btn btn-info btn-block my-4">Login</button>
        <p>Don't have an account? <a id="register-btn2" href="">Register</a></p>
        <div>
          <a id="login-form__cancel">Cancel</a>
        </div>
    </form>

  `);

  window.$logInForm = $logInForm;

  $logInForm.on('submit', function(event) {
    event.preventDefault();

    const data = $(this).serialize();

    logIn(data)
      .then(json => {
        if (!json.user) {
          console.log( "!!!!",json.user);
          views_manager.show('error', 'Failed to login');
          return;
        }
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

  //take user back to food options page on cancel with items saved in cart
  $('body').on('click', '#login-form__cancel', function() {
    event.preventDefault();
    views_manager.show('food_options');
    updateCartTotal();
    footer.show();
  });

  $("body").on('click', '#register-btn2', () => {
    event.preventDefault();
    views_manager.show('signUp');
  });
});

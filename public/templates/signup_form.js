$(() => {

  const $signUpForm = $(`
  <form id="sign-up-form" class="sign-up-form login-form text-center border border-light p-5">
        <p class="h4 mb-4">Sign Up</p>

        <div class="login-forms">
            <input type="text" name="name" class="d-flex justify-content-center form-control mb-4" placeholder="Name">
          </div>

        <div class="login-forms">
          <input type="email" name="email" class="d-flex justify-content-center form-control mb-4" placeholder="Email">
        </div>

        <div class="login-forms">
            <input type="password" name="password" class="d-flex justify-content-center form-control mb-4" placeholder="Password">
        </div>

        <div class="login-forms">
          <input type="tel" name="phone" class="d-flex justify-content-center form-control mb-4" placeholder="Phone Number" pattern="[0-9]{10}" required>
        </div>

        <div class="login-forms">
          <input type="checkbox" name="isRes" class="d-flex justify-content-center form-control mb-4" pattern="[0-9]{10}" required>
        </div>

        <button id="login-form-signup-btn" class="login-forms btn btn-info btn-block my-4">Sign Up</button>
        <div class="login-forms">
            <a id="sign-up-form__cancel">Cancel</a>
        </div>
        <div>
        <hr>
        <p>By clicking
        <em>Sign up</em> you agree to our
        <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">terms of service</a>
        </p>
        </div>
      </form>
  `);

  window.$signUpForm = $signUpForm;

  $signUpForm.on('submit', function(event) {
    event.preventDefault();
    let data = $(this).serialize();
    if (data.includes('isRes=on')) {
      data = data.replace('&isRes=on', '')
      data = data.replace('name', 'title')
      console.log(data)
      addRes(data)
      .then(logIn(data))
      .then((json) => {
        console.log(json);
      renderCarousel();

        localStorage.setItem("logIn", "true");
        view_manager.show('order_view')
      })
    } else {
      data = data.replace('&isRes=on', '')
    signUp(data)
      .then(console.log(data))
      .then(logIn(data))
      .then((json) => {
        header.update(json);
        localStorage.setItem("logIn", "true");
        views_manager.show('food_options');
      });
    }
  });

  $('body').on('click', '#sign-up-form__cancel', function() {
    event.preventDefault();
    views_manager.show('food_options');
    updateCartTotal();
    return false;
  });

});

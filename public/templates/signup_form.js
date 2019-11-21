$(() => {

  const $signUpForm = $(`
  <form id="sign-up-form" class="sign-up-form">
        <p>Sign Up</p>

        <div class="sign-up-form__field-wrapper">
            <input type="text" name="name" placeholder="Name">
          </div>

        <div class="sign-up-form__field-wrapper">
          <input type="email" name="email" placeholder="Email">
        </div>

        <div class="sign-up-form__field-wrapper">
            <input type="password" name="password" placeholder="Password">
        </div>

        <div class="sign-up-form__field-wrapper">
          <input type="tel" name="phone" placeholder="Phone Number" pattern="[0-9]{10}" required>
          <span>Format: 6471239876</span>
        </div>

        <div class="sign-up-form__field-wrapper">
            <button>Sign Up</button>
            <a id="sign-up-form__cancel" href="#">Cancel</a>
        </div>
      </form>
  `);

  window.$signUpForm = $signUpForm;

  $signUpForm.on('submit', function(event) {
    event.preventDefault();

    const data = $(this).serialize();

     signUp(data)
      .then(console.log(data))
      .then(logIn(data))
      .then((json) => {
        header.update(json);
        localStorage.setItem("logIn", "true");
        views_manager.show('food_options');
      });
  });

  $('body').on('click', '#sign-up-form__cancel', function() {
    event.preventDefault();
    views_manager.show('food_options');
    updateCartTotal();
    return false;
  });

});

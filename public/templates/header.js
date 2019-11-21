$(document).ready(function () {
  $("header").on('click', '.second-button', function() {
    $('.animated-icon2').toggleClass('open');
  });

})

//change page header depending on user login status
$(() => {
  window.header = {};

  const $pageHeader = $('#page-header');
  let currentUser = null;
  function updateHeader(user) {
    currentUser = user;
    $pageHeader.find("nav").remove();
    let header;
    if (!user) {
      header = $(`<nav class="navbar navbar-light teal accent-4 mb-4" id="navbar">
                    <a class="navbar-brand navbar-dark" id="brand" >LITUAL</a>
                    <button id="myToggle" class="navbar-toggler second-button" type="button" data-toggle="collapse" data-target="#navbarSupportedContent23"
    aria-controls="navbarSupportedContent23" aria-expanded="false" aria-label="Toggle navigation">
    <div class="animated-icon2"><span></span><span></span><span></span><span></span></div>
  </button>

                  <div class="collapse navbar-collapse" id="navbarSupportedContent23">

                    <ul class="navbar-nav mr-auto">
                      <li class="nav-item ml-auto">
                        <a class="nav-link" id="login-btn">Login</a>
                      </li>
                      <li class="nav-item ml-auto">
                        <a class="nav-link" id="register-btn">Register</a>
                      </li>
                    </ul>
                  </div>
                </nav>`);
    } else {
      header = $(`<nav class="navbar navbar-light teal accent-4 mb-4" id="navbar">
      <a class="navbar-brand navbar-dark" id="brand">LitApp.JS</a>
      <p class="nav-item">Hello ${currentUser.name ? currentUser.name : currentUser.title}</p>

        <a class="logout_button nav-link nav-item" id="logout-button">Logout</a>

    </nav>`);
    }

    $pageHeader.append(header);
  }

  updateHeader(null);

  window.header.update = updateHeader;

  getMyDetails()
    .then(function( json ) {
      updateHeader(json.user);
    });


  //take user back to food options upon clicking logo
  $("header").on('click', '#brand', function(event) {
    event.preventDefault();
    views_manager.show('food_options');
    updateCartTotal();
    const navToggle = $('#myToggle')
    if (navToggle.attr('aria-expanded') === 'true') {
      navToggle.click();
    }
  });

  //take user to login page upon clicking login
  $("header").on('click', '#login-btn', () => {
    views_manager.show('logIn');
    $('#myToggle').click()
  });

  //take user to signup page upon clicking register
  $("header").on('click', '#register-btn', () => {
    views_manager.show('signUp');
    $('#myToggle').click()
  });

  //Upon logout, clear cart back to 0
  $("header").on('click', '.logout_button', () => {
    for (let item of JSON.parse(localStorage[`itemsIdArray`])) {
      if (localStorage[`item${item}Quantity`]) {
        localStorage.setItem(`item${item}Quantity`, "0");
      }
    }
  updateCartTotal();

    logOut().then(() => {
      localStorage.removeItem('res');
      views_manager.show();
      $('#main-content .food-option').show();
      $('#restaurant-listing').show();
      views_manager.show('food_options');
      header.update(null);
      localStorage.removeItem("logIn");
    });
  });

});

function renderOrderView() {
  findOrders(1).then(res => $order_view.renderOrders(res));
  views_manager.show('order_view');
}

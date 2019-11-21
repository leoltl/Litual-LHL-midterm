/*
  always: logo and app name

  when logged out:
    register
    login
  when logged in:
    user name, or restaurant name
      if user name -> cart icon
      if restaurant -> just name
*/

$(document).ready(function () {
  $("header").on('click', '.second-button', function() {
    $('.animated-icon2').toggleClass('open');
  });

})

$(() => {
  window.header = {};

  const $pageHeader = $('#page-header');
  let currentUser = null;
  function updateHeader(user) {
    currentUser = user;
    $pageHeader.find("nav").remove();
    let header;
    if (!user) {
      header = $(`<nav class="navbar navbar-light teal accent-4 mb-4">
                    <a class="navbar-brand navbar-dark" id="brand" href="#">LitApp.JS</a>
                    <button class="navbar-toggler second-button" type="button" data-toggle="collapse" data-target="#navbarSupportedContent23"
    aria-controls="navbarSupportedContent23" aria-expanded="false" aria-label="Toggle navigation">
    <div class="animated-icon2"><span></span><span></span><span></span><span></span></div>
  </button>

                  <div class="collapse navbar-collapse" id="navbarSupportedContent23">

                    <ul class="navbar-nav mr-auto">
                      <li class="nav-item ml-auto">
                        <a class="nav-link" id="login-btn" href="#">Login</a>
                      </li>
                      <li class="nav-item ml-auto">
                        <a class="nav-link" id="register-btn" href="#">Register</a>
                      </li>
                    </ul>
                  </div>
                </nav>`);
    } else {
      header = $(`<nav class="navbar navbar-light teal accent-4 mb-4">
      <a class="navbar-brand navbar-dark" id="brand" href="#">LitApp.JS</a>
      <p class="nav-item">Hello ${currentUser.name ? currentUser.name : currentUser.title}</p>
      <div>
        <a href="#" class="logout_button nav-link nav-item">Logout</a>
      </div>
      </div>
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

  // $("header").on("click", '.my_reservations_button', function() {
  //   propertyListings.clearListings();
  //   getAllReservations()
  //     .then(function(json) {
  //       propertyListings.addProperties(json.reservations, true);
  //       views_manager.show('listings');
  //     })
  //     .catch(error => console.error(error));
  // });
  // $("header").on("click", '.my_listing_button', function() {
  //   propertyListings.clearListings();
  //   getAllListings(`owner_id=${currentUser.id}`)
  //     .then(function(json) {
  //       propertyListings.addProperties(json.properties);
  //       views_manager.show('listings');
  //   });
  // });

  // $("header").on("click", '.home', function() {
  //   propertyListings.clearListings();
  //   getAllListings()
  //     .then(function(json) {
  //       propertyListings.addProperties(json.properties);
  //       views_manager.show('listings');
  //   });
  // });

  $("header").on('click', '#brand', function(event) {
    event.preventDefault();
    views_manager.show('food_options');
    updateCartTotal();

  });

  $("header").on('click', '#login-btn', () => {
    console.log('login btn click')
    // $('#main-content article').hide();
    // $('#restaurant-listing').hide();
    views_manager.show('logIn');
  });

  $("header").on('click', '#register-btn', () => {
    console.log('register btn click')
    views_manager.show('signUp');
  });

  $("header").on('click', '.logout_button', () => {

    for (let item of JSON.parse(localStorage[`itemsIdArray`])) {
      if (localStorage[`item${item}Quantity`]) {
        localStorage.setItem(`item${item}Quantity`, "0");
      }
    }
    updateCartTotal();



    logOut().then(() => {
      localStorage.removeItem('res');
      //loadCheckoutPage();
      views_manager.show();
      $('#main-content .food-option').show();
      $('#restaurant-listing').show();
      //views_manager.show('food_options');
      header.update(null);
      localStorage.removeItem("logIn");
    });
  });

  // $('header').on('click', '.create_listing_button', function() {
  //   views_manager.show('newProperty');
  // });

});

function renderOrderView() {
  findOrders(1).then(res => $order_view.renderOrders(res));
  views_manager.show('order_view');
}

$(() => {
  /* $.ajax({
    method: "GET",
    url: "/api/users"
  }).done(({users}) => {
    for(user of users) {
      console.log(users);
      $("<div>").text(user.name).appendTo($("body"));
    }
  });; */
  // delete localStorage.restaurant_id;
  //localStorage.clear();
  loadCheckoutPage();
  localStorage.res > 0 ?
        views_manager.show('res_order_viewer') :
        views_manager.show('food_options');
  console.log("start");
  $('#main-content article').hide();
  $('#restaurant-listing').hide();
  //views_manager.show('food_options');
});

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
  //localStorage.clear();
  if(!localStorage.itemsIdArray) {localStorage.itemsIdArray = '[]'}
  loadCheckoutPage();
  localStorage.res > 0 ?
        $('#main-content article').hide() &&
        $('#restaurant-listing').hide() &&
        findOrders(1).then(res => $order_view.renderOrders(res)) &&
        views_manager.show('order_view') :
        views_manager.show('food_options');
  console.log("start");

  //views_manager.show('food_options');
});

$(() => {
  if(!localStorage.itemsIdArray) {localStorage.itemsIdArray = '[]'}
  loadCheckoutPage();
  //render food menu page on load
  localStorage.res > 0 ?
        $('#main-content article').hide() &&
        $('#restaurant-listing').hide() &&
        findOrders(1).then(res => $order_view.renderOrders(res)) &&
        views_manager.show('order_view') :
        views_manager.show('food_options');
});

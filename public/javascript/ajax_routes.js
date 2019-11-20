function getMyDetails() {
  return $.ajax({
    url: "api/users/me",
  });
}

function logOut() {
  return $.ajax({
    method: "POST",
    url: "api/users/logout",
  })
}

function logIn(data) {
  return $.ajax({
    method: "POST",
    url: "api/users/login",
    data
  });
}

function signUp(data) {
  return $.ajax({
    method: "POST",
    url: "/users",
    data
  });
}

function showMenu() {
  return $.ajax({
    url: "api/restaurants/me"
  })
}

function findRestaurant(data) {
  return $.ajax({
    method: "POST",
    url: "api/restaurants/info",
    data : {data}
  })
}

function findOrders(restaurantId) {
  return $.ajax({
    url: "/orders",
    data: restaurantId
  })
}

function submitOrder(data) {
  return $.ajax({
    method: "POST",
    url: "/orders",
    data
  })
}

function updateOrder(data, status) {
  return $.ajax({
    method: "POST",
    url: `orders/${data.order_id}`,
    data: {status: status , user_id: data.user_id, estimate: data.estimate}
  })
}

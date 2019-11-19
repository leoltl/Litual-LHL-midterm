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

<<<<<<< HEAD
=======
function findOrders(restaurantId) {
  return $.ajax({
    url: "/orders",
    data: restaurantId
  })
}

>>>>>>> 7a236c4bb43219e53694e8307b7199b6685a013e
function submitOrder(data) {
  return $.ajax({
    method: "POST",
    url: "/restaurants"
  })
}

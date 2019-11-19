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

function submitOrder(data) {
  return $.ajax({
    method: "POST",
    url: "/restaurants",
    data
  })
}

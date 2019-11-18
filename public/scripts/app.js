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
  console.log("start");
  views_manager.show('food_options');
});

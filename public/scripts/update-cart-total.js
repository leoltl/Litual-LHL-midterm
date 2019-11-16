$(document).ready(function() {
  //$("header li.nav-item").hide();
  let totalItemsInCart = parseInt($("footer").text().split(":")[1].trim());
  $(".add-to-cart.form-control").on('click', function() {
    event.preventDefault();
    const quantity = parseInt($(this).closest("form").find("option:selected").val());
    totalItemsInCart += quantity;
    $("footer").text(`items in cart: ${totalItemsInCart}`);
    //$("header li.nav-item").show();
  });
});

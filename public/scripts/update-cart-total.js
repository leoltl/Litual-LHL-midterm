$(document).ready(function() {
  $("footer").hide();
  let totalItemsInCart = parseInt($("footer").text().split(":")[1].trim());
  $(".add-to-cart.form-control").on('click', function(event) {
    event.preventDefault();
    const quantity = parseInt($(this).closest("form").find("option:selected").val());
    totalItemsInCart += quantity;
    $("footer").text(`items in cart: ${totalItemsInCart}`);
    $("footer").show();
  });
});

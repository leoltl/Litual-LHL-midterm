window.updateCartTotal = () => {
  let totalItemsInCart = 0;
  for (let item of JSON.parse(localStorage[`itemsIdArray`])) {
    if (localStorage[`item${item}Quantity`]) {
      totalItemsInCart += parseInt(localStorage[`item${item}Quantity`]);
    }
  }
  $("footer p").text(`items in cart: ${totalItemsInCart}`);
}

//Create loadCheckoutPage function so the page can be rendered whenever item is added or removed

window.loadCheckoutPage = () => {
  //Variable to keep track of total items in cart
  let total = 0;

  //dynamically select added menu and display on checkout page by grabbing values from localStorage
  let orders = ``;
  for (let item of JSON.parse(localStorage[`itemsIdArray`])) {
    if (localStorage[`item${item}Quantity`]) {
      console.log(item);
      if (parseInt(localStorage[`item${item}Quantity`]) > 0) {
        orders += ` <!-- start checkout-item component-->
        <tr class="item-row checkout-item">
          <td class="item">
            <p>${localStorage[`item${item}Name`]}</p>
            <small><a data-itemid="${item}" class="remove-item">Remove Item</a></small>
          </td>
          <td class="unit-price">$${parseInt(localStorage[`item${item}Price`])}</td>
          <td class="quantity">
            <input class="item-quantity" data-itemquantityid="${item}" value=${parseInt(localStorage[`item${item}Quantity`])} type="number" min=1>
          </td>
          <td class="subtotal">$${parseInt(localStorage[`item${item}Quantity`])*parseInt(localStorage[`item${item}Price`])}</td>
        </tr>
        <!-- end checkout-item component-->`;
        total += parseInt(localStorage[`item${item}Quantity`])*parseInt(localStorage[`item${item}Price`]);
      }
    }
  }

  //Table HTML
  const $checkout_page = $(`
  <!-- start checkout_page component -->
      <section class="cart">
        <h3>Your Cart</h3>
        <table class="table cart-table mx-auto">
          <thead>
            <tr>
              <th scope="col">Item</th>
              <th scope="col">Unit Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Subtotal</th>
            </tr>
          </thead>
          <tbody>

        ${orders}

          </tbody>
          <tfoot>
              <tr>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col">Total:</th>
                <th scope="col">$${total}</th>
              </tr>
          </tfoot>
        </table>
        <div class="cart-action">
          <input id="cart-checkout-btn" type="submit" value="Confirm" class="btn btn-success">
          <br />
          <small><a id="cancel">Cancel</a></small>
        </div>
      </section>
      <!-- end checkout_page component -->`);

  window.$checkout_page = $checkout_page;
};


//Go back to food options page on cancel with items saved in cart
$('body').on('click', "#cancel", function() {
  event.preventDefault();
  views_manager.show('food_options');
  updateCartTotal();
  return false;
});

//Remove entire item and re-render page and reupdate cart
$('body').on('click', ".remove-item", function() {
  const id = $(this).data("itemid");
  localStorage.setItem(`item${id}Quantity`, "0");
  views_manager.show('checkout');
  updateCartTotal();
  return false;
});

//Update quantity of item and re-render page and reupdate cart
$('body').on('change', ".item-quantity", function() {
  const id = $(this).data("itemquantityid");
  localStorage.setItem(`item${id}Quantity`, $(this).val().toString());
  views_manager.show('checkout');
  updateCartTotal();
});

//Submit order
$('body').on('click', "#cart-checkout-btn", function() {

  //If user is not logged in, redirect them to login page
  if (!localStorage["logIn"]) {
    views_manager.show("logIn");
  } else {
    //add all items in cart to array to pass the order data object to restaurant
    let orderItems = [];

    for (let i of JSON.parse(localStorage[`itemsIdArray`])) {
      if (localStorage[`item${i}Quantity`] && parseInt(localStorage[`item${i}Quantity`]) > 0) {
        const item = {foodid: i, quantity: parseInt(localStorage[`item${i}Quantity`])};
        orderItems.push(item);
      }
    }

    const data = {
      restaurant_id: parseInt(localStorage.restaurant_id),
      orderItems: orderItems
    };

    //If order is empty, alert user that cart is empty
    if (orderItems.length === 0){
      alert("No Items in Cart, Please add menu");
    } else {
      submitOrder(data);
      alert('Your order has been submitted! Check your phone for updates');
      for (let item of JSON.parse(localStorage[`itemsIdArray`])) {
        if (localStorage[`item${item}Quantity`]) {
          localStorage.setItem(`item${item}Quantity`, "0");
        }
      }
    }
    //Update cart total back to 0 and redirect user to food option page
    updateCartTotal();
    views_manager.show('food_options');
  }

});



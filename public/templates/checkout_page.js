/*
  this will show up once the user either clicks on the checkout footer or the cart icon
  if cart empty -> will show a redirect to the restaurants page
  if cart not empty -> will show a list of the selected items and quantities
                    -> will show total of all selected items at the bottom, updated upon change in quantity or list
                    -> will have a place order button at the bottom
  once order is placed, a new orders row is generated and as many  as there are separate items are generated => this is sent to the restaurant

    user will be redirected to confirmation page
*/

window.loadCheckoutPage = () => {
  let total = 0;
  // parseInt(localStorage.item1Quantity)*parseInt(localStorage.item1Price) +
  // parseInt(localStorage.item2Quantity)*parseInt(localStorage.item2Price) +
  // parseInt(localStorage.item3Quantity)*parseInt(localStorage.item3Price);
  // console.log(total);

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

  /* let i = 1;
  while (true) {
    if (localStorage[`item${i}Quantity`]) {
      console.log(i);
      if (parseInt(localStorage[`item${i}Quantity`]) > 0) {
        orders += ` <!-- start checkout-item component-->
        <tr class="item-row checkout-item">
          <td class="item">
            <p>${localStorage[`item${i}Name`]}</p>
            <small><a data-itemid="${i}" class="remove-item">Remove Item</a></small>
          </td>
          <td class="unit-price">$${parseInt(localStorage[`item${i}Price`])}</td>
          <td class="quantity">
            <input class="item-quantity" data-itemquantityid="${i}" value=${parseInt(localStorage[`item${i}Quantity`])} type="number" min=1>
          </td>
          <td class="subtotal">$${parseInt(localStorage[`item${i}Quantity`])*parseInt(localStorage[`item${i}Price`])}</td>
        </tr>
        <!-- end checkout-item component-->`;
        total += parseInt(localStorage[`item${i}Quantity`])*parseInt(localStorage[`item${i}Price`]);
      }
      i++;
    } else {
      break;
    }
  } */
  //console.log(orders);

  /* const rows = `
  ${(parseInt(localStorage.item1Quantity) > 0) ?
    ` <!-- start checkout-item component-->
    <tr class="item-row checkout-item" data-foodId="1">
      <td class="item">
        <p>${localStorage.item1Name}</p>
        <small><a id="removeItem1" class="remove-item">Remove Item</a></small>
      </td>
      <td class="unit-price">$${parseInt(localStorage.item1Price)}</td>
      <td class="quantity">
        <input id="quantity1" value=${parseInt(localStorage.item1Quantity)} type="number" min=1>
      </td>
      <td class="subtotal">$${parseInt(localStorage.item1Quantity)*parseInt(localStorage.item1Price)}</td>
    </tr>
    <!-- end checkout-item component-->`
   : ""}

   ${(parseInt(localStorage.item2Quantity) > 0) ?
    ` <!-- start checkout-item component-->
    <tr class="item-row checkout-item" data-foodId="2">
      <td class="item">
        <p>${localStorage.item2Name}</p>
        <small><a id="removeItem2" class="remove-item">Remove Item</a></small>
      </td>
      <td class="unit-price">$${parseInt(localStorage.item2Price)}</td>
      <td class="quantity">
        <input id="quantity2" value=${parseInt(localStorage.item2Quantity)} type="number" min=1>
      </td>
      <td class="subtotal">$${parseInt(localStorage.item2Quantity)*parseInt(localStorage.item2Price)}</td>
    </tr>
    <!-- end checkout-item component-->`
   : ""}

   ${(parseInt(localStorage.item3Quantity) > 0) ?
    ` <!-- start checkout-item component-->
    <tr class="item-row checkout-item" data-foodId="3">
      <td class="item">
        <p>${localStorage.item3Name}</p>
        <small><a id="removeItem3" class="remove-item">Remove Item</a></small>
      </td>
      <td class="unit-price">$${parseInt(localStorage.item3Price)}</td>
      <td class="quantity">
        <input id="quantity3" value=${parseInt(localStorage.item3Quantity)} type="number" min=1>
      </td>
      <td class="subtotal">$${parseInt(localStorage.item3Quantity)*parseInt(localStorage.item3Price)}</td>
    </tr>
    <!-- end checkout-item component-->`
   : ""}` */
  const $checkout_page = $(`
  <!-- start checkout_page component -->
      <section class="cart">
        <h3>Your Cart</h3>
        <table class="table cart-table mx-auto"">
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
          <input id="cart-checkout-btn" type="submit" value="Confirm Order" class="call-to-action btn">
          <br />
          <small><a id="cancel">Cancel</a></small>
        </div>
      </section>
      <!-- end checkout_page component -->`);

  window.$checkout_page = $checkout_page;
  //console.log(localStorage);
};



$('body').on('click', "#cancel", function() {
  console.log("push");
  event.preventDefault();
  views_manager.show('food_options');
  updateCartTotal();
  return false;
});

$('body').on('click', ".remove-item", function() {
  console.log("remove clicked");
  const id = $(this).data("itemid");
  console.log(id);
  localStorage.setItem(`item${id}Quantity`, "0");
  views_manager.show('checkout');
  updateCartTotal();
  return false;
});

/* $('body').on('click', "#removeItem2", function() {
  localStorage.setItem("item2Quantity", "0");
  views_manager.show('checkout');
  return false;
});

$('body').on('click', "#removeItem3", function() {
  localStorage.setItem("item3Quantity", "0");
  views_manager.show('checkout');
  return false;
}); */

$('body').on('change', ".item-quantity", function() {
  // console.log("changed 1");
  console.log($(this).val());
  const id = $(this).data("itemquantityid");
  //console.log(id);
  localStorage.setItem(`item${id}Quantity`, $(this).val().toString());
  views_manager.show('checkout');
  updateCartTotal();
});

/* $('body').on('change', "#quantity2", function() {
  console.log("changed 2");
  localStorage.setItem("item2Quantity", $(this).val().toString());
  views_manager.show('checkout');
});

$('body').on('change', "#quantity3", function() {
  console.log("changed 3");
  localStorage.setItem("item3Quantity", $(this).val().toString());
  views_manager.show('checkout');
}); */

$('body').on('click', "#cart-checkout-btn", function() {
  if (!localStorage["logIn"]) {
    views_manager.show("logIn");
  } else {
    console.log("order sent");
    /* Route to create an new Order
    request format should be:
    { restaurant_id : 1,
      orderItems    : [ {foodid: 1, quantity: 1},
                        {foodid: 3, quantity: 2}
                      ]
    }
    */

    let orderItems = [];

    // let i = 1;
    // while (true) {
    //   if (localStorage[`item${i}Quantity`] && parseInt(localStorage[`item${i}Quantity`]) > 0) {
    //     const item = {foodid: i, quantity: parseInt(localStorage[`item${i}Quantity`])};
    //     console.log(orderItems)
    //     orderItems.push(item);
    //     i++;
    //   } else {
    //     console.log('loop over')
    //     break;
    //   }
    // }


    for (let i of JSON.parse(localStorage[`itemsIdArray`])) {
      if (localStorage[`item${i}Quantity`] && parseInt(localStorage[`item${i}Quantity`]) > 0) {
        const item = {foodid: i, quantity: parseInt(localStorage[`item${i}Quantity`])};
        orderItems.push(item);
      }
    }

    /* let i = 1;
    while (true) {
      if (localStorage[`item${i}Quantity`] && parseInt(localStorage[`item${i}Quantity`]) > 0) {
        const item = {foodid: i, quantity: parseInt(localStorage[`item${i}Quantity`])};
        ordersItem.push(item);
        i++;
      } else {
        break;
      }
    } */

    const data = {
      restaurant_id: parseInt(localStorage.restaurant_id),
      orderItems: orderItems
    };
    console.log('order items after loop, before submit', orderItems);

    console.log(data);
    if (orderItems.length === 0){
      alert("No Items in Cart, Please add menu");
    } else {
      submitOrder(data);
      console.log('order items after loop, after submit', orderItems);
      alert('Your order has been submitted! Check your phone for updates');
      for (let item of JSON.parse(localStorage[`itemsIdArray`])) {
        if (localStorage[`item${item}Quantity`]) {
          localStorage.setItem(`item${item}Quantity`, "0");
        }
      }
    }
    updateCartTotal();
    views_manager.show('food_options');
    // call clear cart function here
  }

});



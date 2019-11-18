/*
  this will show up once the user either clicks on the checkout footer or the cart icon
  if cart empty -> will show a redirect to the restaurants page
  if cart not empty -> will show a list of the selected items and quantities
                    -> will show total of all selected items at the bottom, updated upon change in quantity or list
                    -> will have a place order button at the bottom
  once order is placed, a new orders row is generated and as many orderitems as there are separate items are generated => this is sent to the restaurant

    user will be redirected to confirmation page
*/

window.loadCheckoutPage = () => {

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

          ${(parseInt(localStorage.item1) > 0) ?
            ` <!-- start checkout-item component-->
            <tr class="item-row checkout-item" data-foodId="1">
              <td class="item">
                <p>Overpriced Salad</p>
                <small><a class="remove-item">Remove Item</a></small>
              </td>
              <td class="unit-price">$19.99</td>
              <td class="quantity">
                <input value=${parseInt(localStorage.item1)} type="number" min=0>
              </td>
              <td class="subtotal">$19.99</td>
            </tr>
            <!-- end checkout-item component-->`
           : ""}

           ${(parseInt(localStorage.item2) > 0) ?
            ` <!-- start checkout-item component-->
            <tr class="item-row checkout-item" data-foodId="2">
              <td class="item">
                <p>Jay's Favorite</p>
                <small><a class="remove-item">Remove Item</a></small>
              </td>
              <td class="unit-price">$19.99</td>
              <td class="quantity">
                <input value=${parseInt(localStorage.item2)} type="number" min=0>
              </td>
              <td class="subtotal">$19.99</td>
            </tr>
            <!-- end checkout-item component-->`
           : ""}

           ${(parseInt(localStorage.item3) > 0) ?
            ` <!-- start checkout-item component-->
            <tr class="item-row checkout-item" data-foodId="3">
              <td class="item">
                <p>TexMex Bowl</p>
                <small><a class="remove-item">Remove Item</a></small>
              </td>
              <td class="unit-price">$19.99</td>
              <td class="quantity">
                <input value=${parseInt(localStorage.item3)} type="number" min=0>
              </td>
              <td class="subtotal">$19.99</td>
            </tr>
            <!-- end checkout-item component-->`
           : ""}

          </tbody>
          <tfoot>
              <tr>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col">Total:</th>
                <th scope="col">$39.98</th>
              </tr>
          </tfoot>
        </table>
        <div class="cart-action">
          <input id="cart-checkout-btn" type="submit" value="Confirm Order" class="call-to-action btn">
          <br />
          <small><a class="remove-item">Cancel</a></small>
        </div>
      </section>
      <!-- end checkout_page component -->`);

  window.$checkout_page = $checkout_page;
  //console.log(localStorage);

  $('body').on('click', ".remove-item", function() {
    views_manager.show('food_options');
    return false;
  });


};

/*
  this will show:
    the menu items of the restaurant
    each item will have all food item data table values
    AND
    add to cart with a toggle quantity selector
*/

$(() => {
  localStorage.setItem('restaurant_id', '1');
  let currentRes = Number(localStorage.getItem('restaurant_id'));

  function showRestaurant(item) {
    const $restaurant_banner = $(`
      <section id="restaurant-listing" data-restaurantId="${item.restaurant_id}" >
        <h1>BAAAM</h1>
        <small>131 King Street, Toronto</small>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis modi atque corporis hic dolore ea aperiam laudantium eveniet provident quod? Minus, reprehenderit labore excepturi placeat vero quod ex nihil nobis.</p>
      </section>
    `)

    window.$restaurant_banner = $restaurant_banner;
    $('main').append($restaurant_banner).append('<section id="food-options">')
  }

  function updateMenu(item) {
    console.log(item)
    const $food_options = $(`

        <!-- start food-options item component -->
        <article class="food-option" data-foodId="foodid--DYNAMIC">
          <img src=${item.photo_url}>
          <h4>${item.name}</h4>
          <p>${item.description}</p>

          <div class="buy-box">
            <h5 class="price-tag">$${item.price}/order</h5>
            <form action="/order" method="AJAXPOST--TODO">
              <input type="number" min="0">
              <input class="add-to-cart call-to-action form-control" type="submit" value="Add To Cart">
            </form>
          </div>
        </article>
        <!-- end food-options item component -->

    `);

    window.$food_options = $food_options;
    $('main').append($food_options);
  }

  showMenu()
    .then(function(json) {
      showRestaurant(json.menu[0])
      for (let item of json.menu) {
        updateMenu(item)
      }
    });

  $(document).ready(function() {
    let item1Quantity = 0;
    let item2Quantity = 0;
    let item3Quantity = 0;

    $("footer").hide();
    let totalItemsInCart = parseInt($("footer").text().split(":")[1].trim());

    $("#item1.form-control").on('click', function(event) {
      console.log("item1");
      const quantity = parseInt($(this).closest("form").find("option:selected").val());
      item1Quantity += quantity;
      totalItemsInCart += quantity;
      console.log(item1Quantity);
    });

    $("#item2.form-control").on('click', function(event) {
      console.log("item2");
      const quantity = parseInt($(this).closest("form").find("option:selected").val());
      item2Quantity += quantity;
      totalItemsInCart += quantity;
      console.log(item2Quantity);
    });

    $("#item3.form-control").on('click', function(event) {
      console.log("item3");
      const quantity = parseInt($(this).closest("form").find("option:selected").val());
      item3Quantity += quantity;
      totalItemsInCart += quantity;
      console.log(item3Quantity);
    });


    $(".add-to-cart.form-control").on('click', function(event) {
      event.preventDefault();
      //const quantity = parseInt($(this).closest("form").find("option:selected").val());
      //totalItemsInCart += item1Quantity;
      $("footer p").text(`items in cart: ${totalItemsInCart}`);
      $("footer").show();
    });

    $("footer .cart").on('click', function(event) {
      event.preventDefault();
      //console.log(localStorage);
      localStorage.setItem("item1", item1Quantity.toString());
      localStorage.setItem("item2", item2Quantity.toString());
      localStorage.setItem("item3", item3Quantity.toString());

      $("footer").hide();
      views_manager.show("checkout");
    });
  });
});

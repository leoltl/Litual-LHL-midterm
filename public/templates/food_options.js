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
    $('main').append($restaurant_banner).append('<section id="food-options"></section>')
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
    $('#food-options').append($food_options);
  }

  showMenu()
    .then(function(json) {
      showRestaurant(json.menu[0])
      for (let item of json.menu) {
        updateMenu(item)
      }
    });

  $(document).ready(function() {
    $("footer").hide();
    let totalItemsInCart = parseInt($("footer").text().split(":")[1].trim());
    $(".add-to-cart.form-control").on('click', function(event) {
      event.preventDefault();
      const quantity = parseInt($(this).closest("form").find("option:selected").val());
      totalItemsInCart += quantity;
      $("footer p").text(`items in cart: ${totalItemsInCart}`);
      $("footer").show();
    });
  });

  $("footer .cart").on('click', function(event) {
    event.preventDefault();
    $("footer").hide();
    views_manager.show("checkout");
  });

});

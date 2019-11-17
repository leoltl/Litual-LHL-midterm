/*
  this will show:
    the menu items of the restaurant
    each item will have all food item data table values
    AND
    add to cart with a toggle quantity selector
*/

$(() => {

  const $food_options = $(`
  <section id="restaurant-listing" data-restaurantId="1" >
        <h1>BAAAM</h1>
        <small>131 King Street, Toronto</small>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis modi atque corporis hic dolore ea aperiam laudantium eveniet provident quod? Minus, reprehenderit labore excepturi placeat vero quod ex nihil nobis.</p>
      </section>

      <section id="food-options">

       <!-- start food-options item component -->
       <article class="food-option" data-foodId="foodid--DYNAMIC">
        <img src="https://dynamicmedia.zuza.com/zz/m/original_/4/0/40d321ca-2ec2-4e10-82a1-d355f9081393/B823566265Z.1_20170927054258_000_GHL1V9ISF.2_Super_Portrait.jpg" alt="food.name--DYNAMIC">
        <h4>Overpriced Salad</h4>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis dolorum ex perspiciatis voluptate placeat at ducimus neque architecto aliquam quis fugit facere iure, itaque quod.</p>

        <div class="buy-box">
          <h5 class="price-tag">$19.99/order</h5>
          <form action="/order" method="AJAXPOST--TODO">
            <select name="quantity" class="form-control">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="100">100</option>
              </select>
              <input class="add-to-cart call-to-action form-control" type="submit" value="Add To Cart">
          </form>
        </div>
      </article>
      <!-- end food-options item component -->

      <!-- start food-options item component -->
      <article class="food-option" data-foodId="foodid--DYNAMIC">
        <img src="https://www.qsrmagazine.com/sites/default/files/styles/story_page/public/news-image/freshii-adds-kale-caesar-lto-limited-time.jpg?itok=mmm_eMXg" alt="food.name--DYNAMIC">
        <h4>Jay's Favourite</h4>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis dolorum ex perspiciatis voluptate placeat at ducimus neque architecto aliquam quis fugit facere iure, itaque quod.</p>
        <div class="buy-box">
          <h5 class="price-tag">$19.99/order</h5>
          <form action="/order" method="AJAXPOST--TODO">
            <select name="quantity" class="form-control">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="100">100</option>
              </select>
              <input class="add-to-cart call-to-action form-control" type="submit" value="Add To Cart">
          </form>
        </div>
      </article>
      <!-- end food-options item component -->

      <!-- start food-options item component -->
      <article class="food-option" data-foodId="foodid--DYNAMIC">
        <img src="https://www.qsrmagazine.com/sites/default/files/styles/story_page/public/news-image/freshii-launches-biiblos-bowl-inspired-moroccan-flavors.jpg?itok=G2Fr9BZT" alt="food.name--DYNAMIC">
        <h4>TexMex Bowl</h4>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis dolorum ex perspiciatis voluptate placeat at ducimus neque architecto aliquam quis fugit facere iure, itaque quod.</p>
        <div class="buy-box">
          <h5 class="price-tag">$19.99/order</h5>
          <form action="/order" method="AJAXPOST--TODO">
            <select name="quantity" class="form-control">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="100">100</option>
              </select>
              <input class="add-to-cart call-to-action form-control" type="submit" value="Add To Cart">
          </form>
        </div>
      </article>
      <!-- end food-options item component -->

    </section>
  `);

  window.$food_options = $food_options;
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

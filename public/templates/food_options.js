/*
  this will show:
    the menu items of the restaurant
    each item will have all food item data table values
    AND
    add to cart with a toggle quantity selector
*/

$(() => {
  // localStorage.setItem('restaurant_id', '1');
  // let currentRes = Number(localStorage.getItem('restaurant_id'));

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
    //console.log(item)
    const $food_options = $(`

        <!-- start food-options item component -->
        <article class="food-option" data-foodId="foodid--DYNAMIC">
          <img src=${item.photo_url}>
          <h4>${item.name}</h4>
          <p>${item.description}</p>

          <div class="buy-box">
            <h5 class="price-tag">$${item.price}/order</h5>
            <form action="/order" method="AJAXPOST--TODO">
              <input data-itemid="${item.id}" class="add-to-cart call-to-action form-control" type="submit" value="Add To Cart">
            </form>
          </div>
        </article>
        <!-- end food-options item component -->

    `);
    localStorage.setItem(`item${item.id}Price`, item.price.toString());
    localStorage.setItem(`item${item.id}Name`, item.name);
    if (!localStorage[`item${item.id}Quantity`]) {
      localStorage.setItem(`item${item.id}Quantity`, "0");
    }
    console.log(localStorage[`item${item.id}Price`]);
    window.$food_options = $food_options;
    $('#food-options').append($food_options);
  }

  showMenu()
    .then(function(json) {
      if (localStorage.res === undefined) {
        showRestaurant(json.menu[0])
        for (let item of json.menu) {
          updateMenu(item)
        }
      }
    });



  $(document).ready(function() {
    let totalItemsInCart = 0;
    let i = 1;
    while (true) {
      if (localStorage[`item${i}Quantity`]) {
        totalItemsInCart += parseInt(localStorage[`item${i}Quantity`]);
        i++;
      } else {
        break;
      }
    }
    $("footer p").text(`items in cart: ${totalItemsInCart}`);
    //console.log("yo", localStorage[`item1Quantity`]);
    /* let item1Quantity = localStorage[`item1Quantity`] ? parseInt(localStorage[`item1Quantity`]) : 0;
    let item2Quantity = localStorage[`item2Quantity`] ? parseInt(localStorage[`item2Quantity`]) : 0;
    let item3Quantity = localStorage[`item3Quantity`] ? parseInt(localStorage[`item3Quantity`]) : 0; */

    /* localStorage.setItem("item1Quantity", "0");
    localStorage.setItem("item2Quantity", "0");
    localStorage.setItem("item3Quantity", "0");
    console.log(localStorage["item4Quantity"]); */

    //$("footer").hide();

    //parseInt($("footer").text().split(":")[1].trim());

  /*   $("body").on('click', "#item1", function(event) {
      console.log("clicked item1");
      localStorage["item1Quantity"] = (parseInt(localStorage[`item1Quantity`]) + 1).toString();
      //totalItemsInCart++;
      //console.log(item1Quantity);
    });

    $("body").on('click', "#item2", function(event) {
      console.log("item2");
      localStorage["item2Quantity"] = (parseInt(localStorage[`item2Quantity`]) + 1).toString();
      //item2Quantity++;
      //totalItemsInCart++;
      //console.log(item2Quantity);
    });

    $("body").on('click', "#item3", function(event) {
      console.log("item3");
      localStorage["item3Quantity"] = (parseInt(localStorage[`item3Quantity`]) + 1).toString();
      //item3Quantity++;
      //totalItemsInCart++;
      //console.log(item3Quantity);
    }); */


    $("body").on('click', ".add-to-cart.form-control", function(event) {
      event.preventDefault();
      console.log("hello");
      console.log($(this).data("itemid"));
      const id = $(this).data("itemid");
      let totalItemsInCart = parseInt($("footer p").text().split(":")[1]);
      console.log("yolo", totalItemsInCart);
      localStorage[`item${id}Quantity`] = (parseInt(localStorage[`item${id}Quantity`]) + 1).toString();
      //let totalItemsInCart = parseInt(localStorage["item1Quantity"]) + parseInt(localStorage["item2Quantity"]) + parseInt(localStorage["item3Quantity"]);
      totalItemsInCart++;
      $("footer p").text(`items in cart: ${totalItemsInCart}`);
      $("footer").show();
    });

    $("footer .cart").on('click', function(event) {
      event.preventDefault();
      //console.log(localStorage);
      /* localStorage.setItem("item1Quantity", item1Quantity.toString());
      localStorage.setItem("item2Quantity", item2Quantity.toString());
      localStorage.setItem("item3Quantity", item3Quantity.toString()); */

      $("footer").hide();
      views_manager.show("checkout");
    });
  });
});

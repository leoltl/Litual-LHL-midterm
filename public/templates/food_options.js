$(() => {

  function showRestaurant(item) {
    localStorage.setItem('restaurant_id', item.restaurant_id.toString());

    const $restaurant_banner = $(`
      <section id="restaurant-listing" data-restaurantId="${item.restaurant_id}" >
        <div id="transbox">
          <h1>${resInfo.res.title}</h1>
          <small>131 King Street, Toronto</small>
          <p>${resInfo.res.phone}</p>
          <p>${resInfo.res.email}</p>
        </div>
      </section>
    `)

    window.$restaurant_banner = $restaurant_banner;
    $('main').append($restaurant_banner).append('<section id="food-options"></section>')
  }

  //create array to hold all items for the restaurant
  let itemsIdArray = [];

  //Dynamically add items from restaurant
  function updateMenu(item) {
    const $food_options = $(`
        <!-- start food-options item component -->
        <article class="food-option" data-foodId="foodid--DYNAMIC">
          <img src=${item.photo_url}>
          <h4>${item.name}</h4>
          <p>${item.description}</p>

          <div class="buy-box">
          <div class ="login-forms">
            <h5 class="price-tag">$${item.price}/order</h5>
            <form action="/order" method="AJAXPOST--TODO">
            <input data-itemid="${item.id}" class="add-to-cart form-control" type="submit" value="Add To Cart">
            </form>
            </div>
            </div>
        </article>
        <!-- end food-options item component -->

    `);
    itemsIdArray.push(item.id);
    localStorage.setItem(`item${item.id}Price`, item.price.toString());
    localStorage.setItem(`item${item.id}Name`, item.name);
    if (!localStorage[`item${item.id}Quantity`]) {
      localStorage.setItem(`item${item.id}Quantity`, "0");
    }
    console.log(localStorage[`item${item.id}Price`]);
    localStorage.setItem("itemsIdArray", JSON.stringify(itemsIdArray));
    window.$food_options = $food_options;
    $('#food-options').append($food_options);
  }

  localStorage.restaurant_id = '1';

  let resInfo = {};

  const displayRes = async () => {
    let res_id = parseInt(localStorage.restaurant_id);
    await findRestaurant(res_id)
      .then(res => resInfo.res = res)
    return resInfo;
  }

  displayRes();

  showMenu()
    .then(function(json) {
      if (localStorage.res === undefined) {
        showRestaurant(json.menu[0])
        localStorage.setItem("restaurant_id", json.menu[0].id.toString());
        console.log("res id", json.menu[0].id);
        for (let item of json.menu) {
          updateMenu(item)
        }
      }
    });

  $(document).ready(function() {

    //update cart when all menu has been loaded
    updateCartTotal();

    //increase item quantity on add to cart and update cart
    $("body").on('click', ".add-to-cart.form-control", function(event) {
      event.preventDefault();
      const id = $(this).data("itemid");
      let totalItemsInCart = parseInt($("footer p").text());
      localStorage[`item${id}Quantity`] = (parseInt(localStorage[`item${id}Quantity`]) + 1).toString();
      totalItemsInCart++;
      $("footer p").text(`${totalItemsInCart}`);
      $("footer").show();
    });

    //render checkout page upon clicking cart icon
    $("footer").on('click', function(event) {
      event.preventDefault();
      const navToggle = $('#myToggle')
      if (navToggle.attr('aria-expanded') === 'true') {
        navToggle.click();
      }
      views_manager.show("checkout");
    });
  });
});

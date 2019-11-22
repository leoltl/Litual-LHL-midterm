

$(() => {

  const $res_carousel =  $(`
  <section id="restaurant-carousel">

  </section>`);
  window.$res_carousel = $res_carousel
  $('main').prepend($res_carousel).append('<section id="res-display"></section>')

  const appendToCarousel = (resInfo) => {
    const url = resInfo.image || "https://assets.lightspeedhq.com/img/2019/07/8aac85b2-blog_foodpresentationtipsfromtopchefs.jpg";
    url.replace('/',"&sol;")
    return $res_carousel.append(`
    <article data-id="${resInfo.id}" class="restaurant-card" style="background-image: url(${url})">
      <div class="text">
        <h3>${resInfo.title}</h3>
      </div>
    </article>
    `)
  }
  const renderCarousel = () => {
    getAllRestaurants()
      .then(res => res.forEach(restaurant => appendToCarousel(restaurant)))
  }
  renderCarousel();
})




$("main").on('click', '.restaurant-card', function() {
  event.preventDefault();
  // const uniqueFood = new Set();
  // JSON.parse(localStorage[`itemsIdArray`]).forEach(id => uniqueFood.add(id));
  // const uniqueId = (Array.from(uniqueFood));

  for (let item of JSON.parse(localStorage[`itemsIdArray`])) {
    if (localStorage[`item${item}Quantity`]) {
      localStorage.setItem(`item${item}Quantity`, "0");
    }

  }
  delete localStorage[`itemsIdArray`];
  localStorage[`itemsIdArray`] = '[]';

  updateCartTotal();
  console.log('setting res torender', $(this).data('id'));
  localStorage.resToRender = $(this).data('id').toString();
  views_manager.show('food_options');
});

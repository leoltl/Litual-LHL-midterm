

$(() => {

  const $res_carousel =  `
  <section id="restaurant-carousel">
  
        <article class="restaurant-card">
          <div class="text">
            <h3>Osmos</h3>
            <h4>Healthy Food</h4>
            <small>address</small>
          </div>
        </article>
        <article class="restaurant-card">
        <div class="text">
          <h3>Fat Burrito</h3>
        </div>
      </article>
      <article class="restaurant-card">
      <div class="text">
        <h3>title</h3>
        <h4>Healthy Food</h4>
        <small>address</small>
      </div>
    </article>
    <article class="restaurant-card">
          <div class="text">
            <h3>title</h3>
            <h4>Healthy Food</h4>
            <small>address</small>
          </div>
        </article>
        <article class="restaurant-card">
        <div class="text">
          <h3>title</h3>
          <h4>Healthy Food</h4>
          <small>address</small>
        </div>
      </article>
      <article class="restaurant-card">
      <div class="text">
        <h3>title</h3>
        <h4>Healthy Food</h4>
        <small>address</small>
      </div>
    </article>

  </section>`
  window.$res_carousel = $res_carousel
  $('main').append($res_carousel)
})
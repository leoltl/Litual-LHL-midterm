$(() => {
  window.footer = {};

  const $pageFooter = $('.checkout-footer');

  function updateFooter() {
    footer = $(`

    <a class="cart"><i class="fas fa-shopping-cart"></i></a>
    <p>0</p>
    `);

    $pageFooter.append(footer);
  }

  updateFooter();
});

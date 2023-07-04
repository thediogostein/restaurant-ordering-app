import menuArray from '/js/data.js';
let cartItems = [];

function getTotalPrice() {
  return cartItems.reduce((acc, obj) => acc + obj.price, 0);
}

function getCartItemsHtml() {
  return cartItems.map((item) => {
    return `
    <div class="cart-item">
      <h3 class="cart-item-name">${item.name}</h3>
      <button class="btn-remove" data-remove=${item.id}>remove</button>
      <p class="cart-price">$${item.price}</p>
    </div>
    `;
  });
}

function renderCart() {
  const cartItemsHtml = getCartItemsHtml();
  const totalPrice = getTotalPrice();
  document.getElementById('cart-items').innerHTML = cartItemsHtml.join(' ');
  document.getElementById('total-price').textContent = totalPrice;
}

function handleAddItem(menuItemId) {
  cartItems.push(menuArray[menuItemId]);
  document.getElementById('cart-el').classList.add('show');

  renderCart();
}

function removeItem(itemId) {
  let index = cartItems.findIndex((item) => item.id == itemId);

  cartItems.splice(index, 1);

  if (cartItems.length === 0) {
    document.getElementById('cart-el').classList.remove('show');
  }

  const cartItemsHtml = getCartItemsHtml();
  const totalPrice = getTotalPrice();

  renderCart(cartItemsHtml, totalPrice);
}

function openModal() {
  document.querySelector('dialog').showModal();
  pay();
}

function pay() {
  document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('cart-el').classList.remove('show');
    document.getElementById('confirmation-el').classList.add('show');
    document.querySelector('dialog').close();
  });
}

function getMenuHtml() {
  let menuHtml = ``;

  menuArray.forEach((item) => {
    menuHtml += `
    <div class="item-container">
      <div class="emoji">${item.emoji}</div>
      <div class="item-info-container">
        <div class="name">${item.name}</div>
        <div class="description">${item.ingredients.join(', ')}</div>
        <div class="price">$${item.price}</div>
      </div>

      <button class="btn-add" data-add=${item.id}>
        <object data="/img/plus-solid.svg" width='20' height='20'></object>
      </button>
    </div>
    `;
  });

  return menuHtml;
}

function render() {
  document.getElementById('menu-el').innerHTML = getMenuHtml();
}

function init() {
  render();
}

document.addEventListener('DOMContentLoaded', init);
document.addEventListener('click', (e) => {
  if (e.target.dataset.add) {
    handleAddItem(e.target.dataset.add);
  }

  if (e.target.dataset.remove) {
    removeItem(e.target.dataset.remove);
  }

  if (e.target.dataset.role === 'complete-order') {
    openModal();
  }
});

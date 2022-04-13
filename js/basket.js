import { band, band2 } from './modalScroll.js';
import { getUserData, saveUserData, deleteUserData } from './utils.js';

const
  cartButton = document.querySelector('.button-cart'),
  modalCart = document.querySelector('.modal-cart'),
  modalBody = modalCart.querySelector('.modal-body'),
  modalPricetag = modalCart.querySelector('.modal-pricetag'),
  clearCart = modalCart.querySelector('.clear-cart'),
  cardsMenu = document.querySelector('.cards-menu'),
  cart = getUserData(getUserData('user')?.login) || []
;

// Modaaliikkunan avaaminen
const openCart = () => {
  modalCart.classList.add('is-open');
  band();
};

// Modaaliikkunan sulkeminen
const closeCart = () => {
  modalCart.classList.remove('is-open');
  setTimeout(() => {
    band2();
  }, 300);
};

// Napsauta modaaliikkunan sisällä ostoskorin
const innerModalCart = evt => {
  const target = evt.target;

  // Modaaliikkunan sulkeminen
  if (target.classList.contains('close') ||
    target.classList.contains('is-open')) {
    closeCart();
  }

  // Napsauta painikkeita lisätäksesi tai vähentääksesi tilattujen tuotteiden määrää ja poista
  if (target.classList.contains('counter-button')) {
    const id = target.id;
    const food = cart.find(el => el.id === id);

    // Lisääntyä
    if (target.textContent === '+') {
      food.count++;
    }

    // Vähennä
    if (target.textContent === '-') {
      if (food.count > 1) {
        food.count--;
      }
      else {
        return;
      }
    }

    // Poista
    if (target.textContent === 'x') {
      cart.splice(cart.indexOf(food), 1);
    }

    saveUserData(getUserData('user').login, cart);

    renderCart();
  }

  // Ostoskorin tyhjentäminen
  if (target.classList.contains('clear-cart')) {
    cart.length = 0;
    renderCart();
    deleteUserData(getUserData('user').login);
  }
};

// Tuotteen lisääminen ostoskoriin
const addToCart = evt => {
  const buttonAddCart = evt.target.closest('.button-add-cart');

  if (buttonAddCart) {
    const cardEl = evt.target.closest('.card');
    const cartData = {
      id: cardEl.idProduct,
      title: cardEl.querySelector('.card-title').textContent,
      price: parseInt(cardEl.querySelector('.card-price-bold').textContent),
      count: 1,
    };

    const food = cart.find(el => el.id === cartData.id);

    if (!food) {
      cart.push(cartData);
    }
    else {
      food.count++;
    }

    saveUserData(getUserData('user').login, cart);
  }
};

// Korin muodostus
const renderCart = () => {
  modalBody.textContent = '';

  const cartEl = cart.map(el => {
    return `
      <div class="food-row">
          <span class="food-name">${el.title}</span>
          <strong class="food-price">${el.price} €</strong>
          <div class="food-counter">
              <button class="counter-button" id="${el.id}">-</button>
              <span class="counter">${el.count}</span>
              <button class="counter-button" id="${el.id}">+</button>
              <button class="counter-button" id="${el.id}" style="background-color: red;">x</button>
          </div>
      </div>
    `;
  }).join('');

  modalBody.insertAdjacentHTML('beforeend', cartEl);

  modalPricetag.textContent = cart.reduce(
    (price, el) => price + (el.price * el.count), 0) + ' €';
};

// Napsauta painiketta "Lisää ostoskoriin"
cardsMenu.addEventListener('click', addToCart);

// Ostoskorin avaaminen
cartButton.addEventListener('click', () => {
  renderCart();
  openCart();
});

// Napsauta ostoskorin modaalia
modalCart.addEventListener('click', innerModalCart);

// Päivitä ostoskori kirjautumisen ja uloskirjautumisen
export const updateUserData = () => {
  const data = getUserData(getUserData('user')?.login) || [];
  cart.length = 0;
  cart.push(...data);
  renderCart();
};

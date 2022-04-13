// Valitun ravintolan avauskortit
import { getUserData } from '../utils.js';
import { getData } from '../server.js';
import { modalAuthOpen } from '../auth.js';
import { createCardGood } from './createCardGood.js';
import { mySwiper } from '../swipper.js';

const
  cardsMenu = document.querySelector('.cards-menu'),
  containerPromo = document.querySelector('.container__promo'),
  menu = document.querySelector('.menu'),
  restaurantTitle = document.querySelector('.restaurant-title'),
  rating = document.querySelector('.rating'),
  price = document.querySelector('.price'),
  category = document.querySelector('.category')
;

export const openGoods = async evt => {
  const card = evt.target.closest('.card');

  if (card) {
    evt.preventDefault();

    if (getUserData('user')) {
      cardsMenu.textContent = '';

      try {
        await getData(card.product, data => {
          for (const card of data) {
            createCardGood(card);
          }

          // Lisäsin, jotta voit palata takaisin selain kautta 
          history.pushState({}, '', `#${card.nameRestaurant}`);          

          restaurantTitle.textContent = card.nameRestaurant;
          rating.textContent = card.ratingRestaurant;
          price.textContent = `Alk ${card.priceRestaurant} €`;
          category.textContent = card.categoryRestaurant;

          containerPromo.classList.add('hide');
          menu.classList.remove('hide');
          mySwiper.destroy(false);
          window.scrollTo(0, 0);
        });
      }
      catch (error) {
        console.log(error);
      }
    }
    else {
      modalAuthOpen();
    }
  }
};
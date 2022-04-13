import { outputRestaurants } from './moduleCard/outputRestaurants.js';
import { openGoods } from './moduleCard/openGoods.js';
import { returnHome } from './moduleCard/returnHome.js';
import { mySwiper } from './swipper.js';

const
  cardsRestaurants = document.querySelector('.cards-restaurants'),
  logo = document.querySelector('.logo')
;

// Näytä kaikki ravintolat
outputRestaurants();

// click ravintolan korttelle
cardsRestaurants.addEventListener('click', openGoods);

// click logolle
logo.addEventListener('click', returnHome);

// click painiketta takaisin selaimelle 
window.addEventListener('popstate', function (event) {
  returnHome();
  mySwiper.init();
}, false);




















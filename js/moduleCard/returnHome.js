import { mySwiper } from '../swipper.js';

// Klikkaus logoa
const
  containerPromo = document.querySelector('.container__promo'),
  menu = document.querySelector('.menu')
;

export const returnHome = () => {
  menu.classList.add('hide');
  containerPromo.classList.remove('hide');
  mySwiper.init();
  window.scrollTo(0, 0);
};
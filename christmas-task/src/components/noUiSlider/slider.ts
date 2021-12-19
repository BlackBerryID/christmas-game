import * as noUiSlider from 'nouislider';
import 'noUiSlider/dist/nouislider.css';
import { Cards } from '../main/renderCards';
import { LocalStorage } from '../main/storage';

const sliderAmount = document.querySelector('.slider_amount') as noUiSlider.target;
const inputAmountLeftNumber = document.querySelector('.slider_input__amount-left') as HTMLInputElement;
const inputAmountRightNumber = document.querySelector('.slider_input__amount-right') as HTMLInputElement;

noUiSlider.create(sliderAmount as HTMLElement, {
  start: [1, 12],
  range: {
    min: [1],
    max: [12],
  },
  connect: true,
  step: 1,
});

(sliderAmount.noUiSlider as noUiSlider.API).on('update', function (values, handle) {
  const currentValue = values[handle];

  if (handle) {
    inputAmountRightNumber.value = String(Math.round(+currentValue));
  } else {
    inputAmountLeftNumber.value = String(Math.round(+currentValue));
  }

  const storage = new LocalStorage();
  storage.storage.sliderAmount = [+inputAmountLeftNumber.value, +inputAmountRightNumber.value];
  const cards = new Cards();
  cards.renderCards();
});

const sliderYear = document.querySelector('.slider_year') as noUiSlider.target;
const inputYearLeftNumber = document.querySelector('.slider_input__year-left') as HTMLInputElement;
const inputYearRightNumber = document.querySelector('.slider_input__year-right') as HTMLInputElement;

noUiSlider.create(sliderYear as HTMLElement, {
  start: [1940, 2020],
  range: {
    min: [1940],
    max: [2020],
  },
  connect: true,
  step: 10,
});

(sliderYear.noUiSlider as noUiSlider.API).on('update', function (values, handle) {
  const currentValue = values[handle];

  if (handle) {
    inputYearRightNumber.value = String(Math.round(+currentValue));
  } else {
    inputYearLeftNumber.value = String(Math.round(+currentValue));
  }
});

export { sliderAmount, sliderYear };

import * as noUiSlider from 'nouislider';
import 'noUiSlider/dist/nouislider.css';

const sliderAmount = document.querySelector('.slider_amount') as noUiSlider.target;
const inputLeftNumber = document.querySelector('.slider_input__left') as HTMLInputElement;
const inputRightNumber = document.querySelector('.slider_input__right') as HTMLInputElement;

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
    inputRightNumber.value = String(Math.round(+currentValue));
  } else {
    inputLeftNumber.value = String(Math.round(+currentValue));
  }
});

inputLeftNumber.addEventListener('change', function () {
  (sliderAmount.noUiSlider as noUiSlider.API).set([this.value]);
});

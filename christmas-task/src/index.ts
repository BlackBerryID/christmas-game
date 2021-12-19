import './index.scss';
import './components/noUiSlider/slider';
import './components/general/setListeners';
import { Cards } from './components/main/renderCards';

const cards = new Cards();
cards.renderCards();

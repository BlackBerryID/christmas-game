import './index.scss';
import './components/noUiSlider/slider';
import './components/general/setListeners';
import { Cards } from './components/cards/renderCards';
import './components/general/console';

const cards = new Cards();
cards.renderCards();

import './index.scss';
import './components/toysPage/noUiSlider/slider';
import './components/general/setListeners';
import { Cards } from './components/toysPage/cards/renderCards';
import './components/treePage/garland/garland';
import './components/general/console';

const cards = new Cards();
cards.renderCards();

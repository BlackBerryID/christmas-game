import './index.scss';
import './components/toysPage/noUiSlider/slider';
import './components/general/setListeners';
import { Cards } from './components/toysPage/cards/renderCards';
import { Tree } from './components/treePage/tree/tree';
import { Settings } from './components/treePage/settings/settings';
import './components/general/console';
import './components/treePage/garland/garland';

const cards = new Cards();
cards.renderCards();

const tree = new Tree();
tree.renderTree();

const settings = new Settings();
settings.renderBackground();

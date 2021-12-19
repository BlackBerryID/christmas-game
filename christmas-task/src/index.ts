import './index.scss';
import './components/noUiSlider/slider';
import Data from './components/main/data';

const dataClass = new Data();
dataClass.getData().then((data) => console.log(data));

import { sliderAmount, sliderYear } from '../noUiSlider/slider';
import { LocalStorage, ILocalStorage } from './storage';
import { Cards, IData } from './renderCards';

interface IFilters {
  filterByCount(item: IData): boolean;
}

class Filters {
  private storage: ILocalStorage;

  constructor() {
    this.storage = new LocalStorage();
  }

  filterByCount(item: IData): boolean {
    const range = this.storage.storage.sliderAmount || [];
    if (!range.length) return true;
    if (+item.count >= range[0] && +item.count <= range[1]) return true;
    return false;
  }
}

// let result = sliderYear.noUiSlider?.get();
// console.log(parseInt((result as string[])[0]));

export { Filters, IFilters };

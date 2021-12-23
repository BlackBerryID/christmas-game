import { Cards, IData } from '../cards/renderCards';
import { LocalStorage, ILocalStorage } from '../localStorage/storage';

interface ISort {
  select: HTMLSelectElement;
  sortCards(array: IData[]): IData[];
}

class Sort implements ISort {
  public select: HTMLSelectElement;
  private storage: ILocalStorage;

  constructor() {
    this.select = document.querySelector('.select_list') as HTMLSelectElement;
    this.storage = new LocalStorage();
  }

  private changeOption() {
    const cards = new Cards();
    this.storage.storage.sortMethod = (this.select as HTMLSelectElement).value;
    cards.renderCards();
  }

  addListener() {
    this.select.addEventListener('change', this.changeOption.bind(this));
  }

  sortCards(array: IData[]): IData[] {
    const method = this.storage.storage.sortMethod || '0';
    let result;
    switch (method) {
      case '0':
        result = array.sort((a, b) => (a.name > b.name ? 1 : -1));
        break;
      case '1':
        result = array.sort((a, b) => (a.name > b.name ? -1 : 1));
        break;
      case '2':
        result = array.sort((a, b) => +a.count - +b.count);
        break;
      case '3':
        result = array.sort((a, b) => +b.count - +a.count);
        break;
    }
    return result as IData[];
  }
}

export { Sort, ISort };

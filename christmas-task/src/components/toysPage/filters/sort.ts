import { Cards, IData } from '../cards/renderCards';
import { LocalStorage, ILocalStorage } from '../../localStorage/storage';

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
    this.select.addEventListener('change', () => this.changeOption());
  }

  sortCards(array: IData[]): IData[] {
    const method = this.storage.storage.sortMethod || '0';
    const result =
      method === '0'
        ? array.sort((a, b) => (a.name > b.name ? 1 : -1))
        : method === '1'
        ? array.sort((a, b) => (a.name > b.name ? -1 : 1))
        : method === '2'
        ? array.sort((a, b) => +a.count - +b.count)
        : array.sort((a, b) => +b.count - +a.count);
    return result as IData[];
  }
}

export { Sort, ISort };

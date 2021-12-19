import { LocalStorage, ILocalStorage } from './storage';
import { Cards, IData } from './renderCards';

interface IFilters {
  filterByCount(item: IData): boolean;
  filterByYear(item: IData): boolean;
  addListener(): void;
  shapeFieldClicksHandler(e: Event): void;
  filterByShape(item: IData): boolean;
}

class Filters implements IFilters {
  private storage: ILocalStorage;
  private shapeField: HTMLElement;
  private shapeItems: NodeList;
  constructor() {
    this.shapeField = document.querySelector('.shape_list') as HTMLElement;
    this.shapeItems = document.querySelectorAll('.shape-item') as NodeList;
    this.storage = new LocalStorage();
  }

  filterByShape(item: IData): boolean {
    const shapes = this.storage.storage.shapes;
    if (!shapes || !shapes!.size) return true;
    return shapes!.has(item.shape);
  }

  shapeFieldClicksHandler(e: Event): void {
    if (!(e.target as HTMLElement).classList.contains('shape-item')) return;
    (e.target as HTMLElement).classList.toggle('active');
    if (!this.storage.storage.shapes) this.storage.storage.shapes = new Set();
    this.shapeItems.forEach((item) => {
      if ((item as HTMLElement).classList.contains('active')) {
        this.storage.storage.shapes?.add((item.textContent as string).toLowerCase());
      } else {
        this.storage.storage.shapes?.delete((item.textContent as string).toLowerCase());
      }
    });
  }

  addListener() {
    const cards = new Cards();
    this.shapeField.addEventListener('click', (e) => {
      this.shapeFieldClicksHandler(e);
      cards.renderCards();
    });
  }

  filterByCount(item: IData): boolean {
    const range = this.storage.storage.sliderAmount || [];
    if (!range.length) return true;
    if (+item.count >= range[0] && +item.count <= range[1]) return true;
    return false;
  }

  filterByYear(item: IData): boolean {
    const range = this.storage.storage.sliderYear || [];
    if (!range.length) return true;
    if (+item.year >= range[0] && +item.year <= range[1]) return true;
    return false;
  }
}

export { Filters, IFilters };

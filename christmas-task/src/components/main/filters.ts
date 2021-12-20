import { LocalStorage, ILocalStorage } from './storage';
import { Cards, IData } from './renderCards';

interface IFilters {
  filterByCount(item: IData): boolean;
  filterByYear(item: IData): boolean;
  addListener(): void;
  filterByShape(item: IData): boolean;
  filterByColor(item: IData): boolean;
}

class Filters implements IFilters {
  private storage: ILocalStorage;
  private shapeField: HTMLElement;
  private shapeItems: NodeList;
  private colorField: HTMLElement;
  private colorItems: NodeList;

  constructor() {
    this.shapeField = document.querySelector('.shape_list') as HTMLElement;
    this.shapeItems = document.querySelectorAll('.shape-item') as NodeList;
    this.colorField = document.querySelector('.color_list') as HTMLElement;
    this.colorItems = document.querySelectorAll('.color-item') as NodeList;
    this.storage = new LocalStorage();
  }

  addListener() {
    const cards = new Cards();
    this.shapeField.addEventListener('click', (e) => {
      this.shapeFieldClicksHandler(e);
      cards.renderCards();
    });
    this.colorField.addEventListener('click', (e) => {
      this.colorFieldClicksHandler(e);
      cards.renderCards();
    });
  }

  filterByColor(item: IData): boolean {
    const colors = this.storage.storage.colors;
    if (!colors || !colors!.size) return true;
    return colors!.has(item.color);
  }

  private colorFieldClicksHandler(e: Event): void {
    if (!(e.target as HTMLElement).classList.contains('color-item')) return;
    if (!this.storage.storage.colors) this.storage.storage.colors = new Set();
    this.colorItems.forEach((item) => {
      if ((item as HTMLInputElement).checked) {
        this.storage.storage.colors?.add((item as HTMLElement).dataset.color as string);
      } else {
        this.storage.storage.colors?.delete((item as HTMLElement).dataset.color as string);
      }
    });
  }

  filterByShape(item: IData): boolean {
    const shapes = this.storage.storage.shapes;
    if (!shapes || !shapes!.size) return true;
    return shapes!.has(item.shape);
  }

  private shapeFieldClicksHandler(e: Event): void {
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

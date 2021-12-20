import { LocalStorage, ILocalStorage } from './storage';
import { Cards, IData } from './renderCards';

interface IFilters {
  filterByCount(item: IData): boolean;
  filterByYear(item: IData): boolean;
  addListener(): void;
  filterByShape(item: IData): boolean;
  filterByColor(item: IData): boolean;
  filterBySize(item: IData): boolean;
  filterByFavorite(item: IData): boolean;
}

class Filters implements IFilters {
  private storage: ILocalStorage;
  private shapeField: HTMLElement;
  private shapeItems: NodeList;
  private colorField: HTMLElement;
  private colorItems: NodeList;
  private sizeField: HTMLElement;
  private sizeItems: NodeList;
  private favoriteItem: HTMLElement;

  constructor() {
    this.shapeField = document.querySelector('.shape_list') as HTMLElement;
    this.shapeItems = document.querySelectorAll('.shape-item') as NodeList;
    this.colorField = document.querySelector('.color_list') as HTMLElement;
    this.colorItems = document.querySelectorAll('.color-item') as NodeList;
    this.sizeField = document.querySelector('.size_list') as HTMLElement;
    this.sizeItems = document.querySelectorAll('.size-item') as NodeList;
    this.favoriteItem = document.querySelector('.favorite-item') as HTMLElement;
    this.storage = new LocalStorage();
  }

  addListener() {
    const cards = new Cards();
    this.shapeField.addEventListener('click', (e) => {
      this.shapeFieldClicksHandler(e);
      cards.renderCards();
    });
    this.colorField.addEventListener('click', (e) => {
      if (!(e.target as HTMLElement).classList.contains('color-item')) return;
      this.colorFieldClicksHandler();
      cards.renderCards();
    });
    this.sizeField.addEventListener('click', (e) => {
      if (!(e.target as HTMLElement).classList.contains('size-item')) return;
      this.sizeFieldClicksHandler();
      cards.renderCards();
    });
    this.favoriteItem.addEventListener('click', () => {
      this.favoriteItemClicksHandler();
      cards.renderCards();
    });
  }

  filterByFavorite(item: IData): boolean {
    const isFavorite = this.storage.storage.isFavorite;
    if (!isFavorite) return true;
    return item.favorite;
  }

  private favoriteItemClicksHandler(): void {
    if (!this.storage.storage.isFavorite) this.storage.storage.isFavorite = false;

    if ((this.favoriteItem as HTMLInputElement).checked) {
      this.storage.storage.isFavorite = true;
    } else {
      this.storage.storage.isFavorite = false;
    }
  }

  filterBySize(item: IData): boolean {
    const sizes = this.storage.storage.sizes;
    if (!sizes || !(sizes as Set<string>).size) return true;
    return (sizes as Set<string>).has(item.size);
  }

  private sizeFieldClicksHandler(): void {
    if (!this.storage.storage.sizes) this.storage.storage.sizes = new Set();
    this.sizeItems.forEach((item) => {
      if ((item as HTMLInputElement).checked) {
        (this.storage.storage.sizes as Set<string>).add((item as HTMLElement).dataset.size as string);
      } else {
        (this.storage.storage.sizes as Set<string>).delete((item as HTMLElement).dataset.size as string);
      }
    });
  }

  filterByColor(item: IData): boolean {
    const colors = this.storage.storage.colors;
    if (!colors || !(colors as Set<string>).size) return true;
    return (colors as Set<string>).has(item.color);
  }

  private colorFieldClicksHandler(): void {
    if (!this.storage.storage.colors) this.storage.storage.colors = new Set();
    this.colorItems.forEach((item) => {
      if ((item as HTMLInputElement).checked) {
        (this.storage.storage.colors as Set<string>).add((item as HTMLElement).dataset.color as string);
      } else {
        (this.storage.storage.colors as Set<string>).delete((item as HTMLElement).dataset.color as string);
      }
    });
  }

  filterByShape(item: IData): boolean {
    const shapes = this.storage.storage.shapes;
    if (!shapes || !(shapes as Set<string>).size) return true;
    return (shapes as Set<string>).has(item.shape);
  }

  private shapeFieldClicksHandler(e: Event): void {
    if (!(e.target as HTMLElement).classList.contains('shape-item')) return;
    (e.target as HTMLElement).classList.toggle('active');
    if (!this.storage.storage.shapes) this.storage.storage.shapes = new Set();
    this.shapeItems.forEach((item) => {
      if ((item as HTMLElement).classList.contains('active')) {
        (this.storage.storage.shapes as Set<string>).add((item.textContent as string).toLowerCase());
      } else {
        (this.storage.storage.shapes as Set<string>).delete((item.textContent as string).toLowerCase());
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

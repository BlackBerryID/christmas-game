import { Cards, IData } from '../toysPage/cards/renderCards';

interface ISearch {
  filterBySearchInputValue(item: IData): boolean;
  addListener(): void;
  searchInputHandler(): void;
}

class Search {
  private searchInput: HTMLInputElement;

  constructor() {
    this.searchInput = document.querySelector('.search') as HTMLInputElement;
  }

  addListener(): void {
    this.searchInput.addEventListener('input', () => this.searchInputHandler());
  }

  filterBySearchInputValue(item: IData): boolean {
    const regExp = new RegExp(this.searchInput.value, 'i');
    return regExp.test(item.name);
  }

  searchInputHandler(): void {
    const cards = new Cards();
    cards.renderCards();
  }
}

export { Search, ISearch };

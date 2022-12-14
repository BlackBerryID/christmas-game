import { Sort, ISort } from '../filters/sort';
import { Filters, IFilters } from '../filters/filters';
import { Select, ISelect } from './selectCards';
import { Search, ISearch } from '../../header/search';
import { LocalStorage, ILocalStorage } from '../../localStorage/storage';

interface IData {
  [index: string]: string | boolean;
  num: string;
  name: string;
  count: string;
  year: string;
  shape: string;
  color: string;
  size: string;
  favorite: boolean;
}

interface ICardDescription<T> {
  [index: string]: T;
  count: T;
  year: T;
  shape: T;
  color: T;
  size: T;
  favorite: T;
}

interface ICards {
  renderCards(): Promise<void>;
}

class Cards implements ICards {
  static cardDescription: ICardDescription<string>;
  private cardsInnerWrapper: HTMLElement;
  private sort: ISort;
  private filters: IFilters<Boolean>;
  private select: ISelect;
  private search: ISearch;
  private storage: ILocalStorage;
  private cardsSection: HTMLElement;
  private selectedCardsNumber: HTMLElement;

  constructor() {
    Cards.cardDescription = {
      count: 'Количество: ',
      year: 'Год покупки: ',
      shape: 'Форма: ',
      color: 'Цвет: ',
      size: 'Размер: ',
      favorite: 'Любимая: ',
    };
    this.cardsSection = document.querySelector('.cards') as HTMLElement;
    this.cardsInnerWrapper = document.querySelector('.cards_inner-wrapper') as HTMLElement;
    this.selectedCardsNumber = document.querySelector('.counter_number') as HTMLElement;
    this.sort = new Sort();
    this.filters = new Filters();
    this.select = new Select();
    this.search = new Search();
    this.storage = new LocalStorage();
  }

  private getCardDescription(key: string): string {
    return Cards.cardDescription[key];
  }

  private createCard(cardInfo: IData): HTMLElement {
    const card = document.createElement('div');
    card.classList.add('card');
    card.id = cardInfo.num;
    if (this.select.isSelectedCard(cardInfo)) card.classList.add('active');
    const title = document.createElement('h3');
    title.classList.add('title', 'card_title');
    title.textContent = `${cardInfo.name}`;
    card.append(title);
    const cardInnerWrapper = document.createElement('div');
    cardInnerWrapper.classList.add('card_inner-wrapper');
    card.append(cardInnerWrapper);
    const img = document.createElement('img');
    img.src = `./public/toys/${cardInfo.num}.png`;
    img.alt = 'toy';
    img.classList.add('card_img');
    cardInnerWrapper.append(img);
    const description = document.createElement('div');
    description.classList.add('card_description');
    cardInnerWrapper.append(description);
    for (const key in cardInfo) {
      if (key !== 'num' && key !== 'name') {
        const el = document.createElement('p');
        el.classList.add(`card_${cardInfo[key]}`);
        el.textContent = this.getCardDescription(key);
        const span = document.createElement('span');
        if (key !== 'favorite') {
          span.textContent = cardInfo[key] as string;
        } else {
          span.textContent = cardInfo[key] === false ? 'нет' : 'да';
        }
        el.append(span);
        description.append(el);
      }
    }
    return card;
  }

  async renderCards(): Promise<void> {
    let cardsArray: IData[] = await (await fetch('../public/data.json')).json();
    this.sort.sortCards(cardsArray);
    cardsArray = cardsArray.filter((item) => this.search.filterBySearchInputValue(item));
    cardsArray = cardsArray.filter((item) => this.filters.filterByCount(item));
    cardsArray = cardsArray.filter((item) => this.filters.filterByYear(item));
    cardsArray = cardsArray.filter((item) => this.filters.filterByShape(item));
    cardsArray = cardsArray.filter((item) => this.filters.filterByColor(item));
    cardsArray = cardsArray.filter((item) => this.filters.filterBySize(item));
    cardsArray = cardsArray.filter((item) => this.filters.filterByFavorite(item));
    if (!cardsArray.length) {
      this.cardsSection.classList.add('no-match');
    } else {
      this.cardsSection.classList.remove('no-match');
    }
    this.cardsInnerWrapper.innerHTML = '';
    this.selectedCardsNumber.textContent = String((this.storage.storage.selected as Set<string>).size) as string;
    this.sort.select.selectedIndex = +this.storage.storage.sortMethod! || 0;
    cardsArray.forEach((item) => this.cardsInnerWrapper.append(this.createCard(item)));
  }
}

export { Cards, IData, ICards };

import { LocalStorage, ILocalStorage } from '../../localStorage/storage';
import { IData } from '../../toysPage/cards/renderCards';

interface ISelected {
  renderSelectedToys(): Promise<void>;
}

class Selected {
  private selectedToysList: HTMLElement;
  private storage: ILocalStorage;

  constructor() {
    this.selectedToysList = document.querySelector('.selected-toys_list') as HTMLElement;
    this.storage = new LocalStorage();
  }

  private filterBySelected(selectedToysList: Set<string>, item: IData): boolean {
    return selectedToysList.has(item.num);
  }

  private createSelectedToyCard(cardInfo: IData): HTMLElement {
    const card = document.createElement('li');
    card.classList.add('selected-toys_item');
    card.dataset.num = cardInfo.num;
    const count = document.createElement('p');
    count.classList.add('selected-toys_item__number');
    count.textContent = cardInfo.count;
    card.append(count);
    for (let i = 1; i <= +cardInfo.count; i++) {
      const img = document.createElement('img');
      img.src = `./public/toys/${cardInfo.num}.png`;
      img.classList.add('selected-toys_item__img');
      img.alt = 'toy';
      img.draggable = true;
      img.dataset.imgnum = cardInfo.num;
      img.id = cardInfo.num + '-' + i;
      card.append(img);
    }
    return card;
  }

  async renderSelectedToys(): Promise<void> {
    const cardsArray: IData[] = await (await fetch('../public/data.json')).json();
    const toysList = this.storage.storage.selected;
    if ((toysList as Set<string>).size) {
      const selectedToysCards = cardsArray.filter((item) =>
        this.filterBySelected(toysList as Set<string>, item as IData)
      );
      this.selectedToysList.innerHTML = '';
      selectedToysCards.forEach((item) => this.selectedToysList.append(this.createSelectedToyCard(item)));
    }
    console.log(toysList);
  }
}

export { Selected, ISelected };

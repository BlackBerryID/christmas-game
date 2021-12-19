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

interface ICardDescription {
  [index: string]: string;
  count: string;
  year: string;
  shape: string;
  color: string;
  size: string;
  favorite: string;
}

export default class Cards {
  private cardDescription: ICardDescription;
  private cardsInnerWrapper: HTMLElement;

  constructor() {
    this.cardDescription = {
      count: 'Количество: ',
      year: 'Год покупки: ',
      shape: 'Форма: ',
      color: 'Цвет: ',
      size: 'Размер: ',
      favorite: 'Любимая: ',
    };
    this.cardsInnerWrapper = document.querySelector('.cards_inner-wrapper') as HTMLElement;
  }

  private getCardDescription(key: string): string {
    return this.cardDescription[key];
  }

  createCard(cardInfo: IData): HTMLElement {
    const card = document.createElement('div');
    card.classList.add('card');
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
    const cardsArray: IData[] = await (await fetch('../public/data.json')).json();
    cardsArray.forEach((item) => this.cardsInnerWrapper.append(this.createCard(item)));
    console.log(cardsArray);
  }
}

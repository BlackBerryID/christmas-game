import { LocalStorage, ILocalStorage } from './storage';
import { IData } from './renderCards';

interface ISelect {
  addListener(): void;
  isSelectedCard(item: IData): boolean;
}

type M = MouseEvent & {
  path?: Node[];
};

class Select implements ISelect {
  private cardContainer: HTMLElement;
  private storage: ILocalStorage;
  private counter: HTMLElement;

  constructor() {
    this.cardContainer = document.querySelector('.cards_inner-wrapper') as HTMLElement;
    this.storage = new LocalStorage();
    this.counter = document.querySelector('.counter_number') as HTMLElement;
  }

  addListener() {
    this.cardContainer.addEventListener('click', (e: M) => this.cardContainerClicksHandler(e));
  }

  isSelectedCard(item: IData): boolean {
    if (!this.storage.storage.selected) return false;
    if ((this.storage.storage.selected as Set<string>).has(item.num)) return true;
    return false;
  }

  private cardContainerClicksHandler(e: M): void {
    if (!this.storage.storage.selected) this.storage.storage.selected = new Set();
    (e.path as Node[]).slice(0, 6).forEach((item) => {
      if ((item as HTMLElement).classList.contains('card')) {
        if ((item as HTMLElement).classList.contains('active')) {
          (item as HTMLElement).classList.remove('active');
          (this.storage.storage.selected as Set<string>).delete((item as HTMLElement).id);
        } else {
          if (+this.counter.textContent! >= 20) {
            (item as HTMLElement).classList.add('message');
            setTimeout(() => (item as HTMLElement).classList.remove('message'), 1000);
            return;
          }
          (item as HTMLElement).classList.add('active');
          (this.storage.storage.selected as Set<string>).add((item as HTMLElement).id);
        }
        this.counter.textContent = String((this.storage.storage.selected as Set<string>).size);
      }
    });
  }
}

export { Select, ISelect };

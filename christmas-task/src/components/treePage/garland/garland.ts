import { LocalStorage, ILocalStorage } from '../../localStorage/storage';

type IPixelRatioData = {
  [property: string]: number;
};

const pixelRatioData: IPixelRatioData = {
  one: 120,
  two: 75,
  three: 62,
  four: 55,
};

interface IGarland {
  addListener(): void;
  toggleGarland(): void;
}

class Garland {
  private treeWrapper: HTMLElement;
  private garlandContainer: HTMLElement;
  private garlandButtonsWrapper: HTMLElement;
  private garlandToggleBtn: HTMLInputElement;
  private storage: ILocalStorage;

  constructor() {
    this.treeWrapper = document.querySelector('.tree-column_wrapper') as HTMLElement;
    this.garlandContainer = document.querySelector('.garland_container') as HTMLElement;
    this.garlandButtonsWrapper = document.querySelector('.garland_buttons-wrapper') as HTMLElement;
    this.garlandToggleBtn = document.querySelector('.checkbox') as HTMLInputElement;
    this.storage = new LocalStorage();
  }

  addListener(): void {
    this.garlandButtonsWrapper.addEventListener('click', (e) => this.garlandButtonsClicksHandler(e));
    this.garlandToggleBtn.addEventListener('change', () => this.toggleGarland());
  }

  private garlandButtonsClicksHandler(e: Event) {
    if (!(e.target as HTMLElement).classList.contains('garland_btn')) return;
    const color = (e.target as HTMLElement).dataset.color;
    if (!this.garlandToggleBtn.checked) this.garlandToggleBtn.checked = true;
    this.renderGarland(color!);
  }

  toggleGarland(): void {
    if (!this.garlandToggleBtn.checked) {
      this.garlandContainer.className = 'garland_container';
      this.removeGarland();
    } else {
      const garlandColor = this.storage.storage.garlandColor || 'multicolor';
      this.renderGarland(garlandColor);
    }
  }

  private removeGarland(): void {
    const previousGarlandRopes = this.garlandContainer.querySelectorAll('ul');
    previousGarlandRopes.forEach((item) => item.remove());
  }

  private renderGarland(color: string): void {
    this.storage.storage.garlandColor = color;
    this.garlandContainer.className = `garland_container ${color}`;
    this.removeGarland();
    this.garlandContainer.append(this.createRope('one'));
    this.garlandContainer.append(this.createRope('two'));
    this.garlandContainer.append(this.createRope('three'));
    this.garlandContainer.append(this.createRope('four'));
  }

  private createRope(lightrope: string): HTMLUListElement {
    let treeContainerWidth = this.treeWrapper.offsetWidth;
    const pixelsPerOneLight = pixelRatioData[lightrope];
    const rope = document.createElement('ul');
    rope.classList.add('lightrope', lightrope);
    while (treeContainerWidth >= pixelsPerOneLight) {
      const li = document.createElement('li');
      li.style.animationDuration = Math.random() * 1 + 1 + 's';
      rope.append(li);
      treeContainerWidth = treeContainerWidth - pixelRatioData[lightrope];
    }
    return rope;
  }
}

export { Garland, IGarland };

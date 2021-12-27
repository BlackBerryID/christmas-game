type IPixelRatioData = {
  [property: string]: number;
};

const pixelRatioData: IPixelRatioData = {
  one: 120,
  two: 75,
  three: 62,
  four: 55,
};

class Garland {
  private treeWrapper: HTMLElement;
  private testBTN: HTMLElement;
  private garlandContainer: HTMLElement;
  private garlandButtonsWrapper: HTMLElement;

  constructor() {
    this.treeWrapper = document.querySelector('.tree-column_wrapper') as HTMLElement;
    this.testBTN = document.querySelector('.blue-btn') as HTMLElement;
    this.garlandContainer = document.querySelector('.garland_container') as HTMLElement;
    this.garlandButtonsWrapper = document.querySelector('.garland_buttons-wrapper') as HTMLElement;
  }

  addListener() {
    this.garlandButtonsWrapper.addEventListener('click', (e) => this.garlandButtonsClicksHandler(e));
  }

  garlandButtonsClicksHandler(e: Event) {
    if (!(e.target as HTMLElement).classList.contains('garland_btn')) return;
    const color = (e.target as HTMLElement).dataset.color;
    this.renderGarland(color!);
  }

  renderGarland(color: string): void {
    this.garlandContainer.className = `garland_container ${color}`;
    const previousGarlandRopes = this.garlandContainer.querySelectorAll('ul');
    previousGarlandRopes.forEach((item) => item.remove());
    this.garlandContainer.append(this.createRope('one'));
    this.garlandContainer.append(this.createRope('two'));
    this.garlandContainer.append(this.createRope('three'));
    this.garlandContainer.append(this.createRope('four'));
  }

  createRope(lightrope: string): HTMLUListElement {
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

export { Garland };

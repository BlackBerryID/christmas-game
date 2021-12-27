type IPixelRatioData = {
  [property: string]: number;
};

const pixelRatioData: IPixelRatioData = {
  one: 120,
  two: 75,
  three: 65,
  four: 55,
};

class Garland {
  private treeWrapper: HTMLElement;
  private testBTN: HTMLElement;
  private garlandContainer: HTMLElement;

  constructor() {
    this.treeWrapper = document.querySelector('.tree-column_wrapper') as HTMLElement;
    this.testBTN = document.querySelector('.blue-btn') as HTMLElement;
    this.garlandContainer = document.querySelector('.garland_container') as HTMLElement;
  }

  addListener() {
    // window.addEventListener('load', () => this.show());
    this.testBTN.addEventListener('click', () => this.renderGarland());
  }

  show() {
    console.log(this.treeWrapper.offsetWidth);
  }

  renderGarland() {
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
      rope.append(document.createElement('li'));
      treeContainerWidth = treeContainerWidth - pixelRatioData[lightrope];
    }
    return rope;
  }
}

export { Garland };

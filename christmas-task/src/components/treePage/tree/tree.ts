import { LocalStorage, ILocalStorage } from '../../localStorage/storage';
import { Drag, IDrag } from '../selected/drag';

interface ITree {
  addListener(): void;
  renderTree(): void;
  clearTree(): void;
}

class Tree implements ITree {
  private treeWrapper: HTMLElement;
  private chooseTreeWrapper: HTMLElement;
  private storage: ILocalStorage;
  private drag: IDrag;

  constructor() {
    this.treeWrapper = document.querySelector('.tree-column_wrapper') as HTMLElement;
    this.chooseTreeWrapper = document.querySelector('.choose-tree_cards') as HTMLElement;
    this.storage = new LocalStorage();
    this.drag = new Drag();
  }

  addListener(): void {
    this.chooseTreeWrapper.addEventListener('click', (e) => this.treeCardsClicksHandler(e));
  }

  renderTree(): void {
    const treeNum = JSON.parse(localStorage.getItem('storage')!).treeNum || '1';
    this.changeTree(treeNum);
  }

  clearTree(): void {
    const imagesOnTree = this.treeWrapper.querySelectorAll('.selected-toys_item__img');
    imagesOnTree.forEach((item) => item.remove());
  }

  private treeCardsClicksHandler(e: Event): void {
    const card = (e.target as HTMLElement).classList.contains('choose-tree_card')
      ? e.target
      : ((e.target as HTMLElement).parentNode as HTMLElement).classList.contains('choose-tree_card')
      ? (e.target as HTMLElement).parentNode
      : null;
    if (!card) return;
    const treeNum = (card as HTMLElement).dataset.treeNum!;
    this.storage.storage.treeNum = treeNum;
    console.log(this.storage.storage);
    this.changeTree(treeNum);
  }

  private changeTree(num: string): void {
    const img = new Image();
    img.src = `../public/tree/${num}.png`;
    img.classList.add('tree-column_img');
    img.alt = 'christmas tree';
    img.setAttribute('usemap', '#image-map');
    img.onload = () => {
      this.treeWrapper.querySelector('.tree-column_img')?.remove();
      this.treeWrapper.append(img);
      this.treeWrapper.innerHTML += `<map class="map" name="image-map">
      <area coords="${img.offsetWidth / 2},0,
                    ${img.offsetWidth},${(img.offsetHeight / 5) * 4},
                    ${img.offsetWidth / 2},${img.offsetHeight},
                    0,${(img.offsetHeight / 5) * 4}" shape="poly" href="#"/>
      </map>`;
      this.drag.setTreeMap();
    };
  }
}

export { Tree, ITree };

import { Tree, ITree } from '../tree/tree';
import { LocalStorage, ILocalStorage } from '../../localStorage/storage';

class Settings {
  private chooseTreeWrapper: HTMLElement;
  private chooseBackground: HTMLElement;
  private treeColumn: HTMLElement;
  private tree: ITree;
  private storage: ILocalStorage;

  constructor() {
    this.chooseTreeWrapper = document.querySelector('.choose-tree_cards') as HTMLElement;
    this.chooseBackground = document.querySelector('.choose-background_cards') as HTMLElement;
    this.treeColumn = document.querySelector('.tree-column') as HTMLElement;
    this.tree = new Tree();
    this.storage = new LocalStorage();
  }

  addListener(): void {
    this.chooseTreeWrapper.addEventListener('click', (e) => this.tree.treeCardsClicksHandler(e));
    this.chooseBackground.addEventListener('click', (e) => this.backgroundCardsClicksHandler(e));
  }

  private backgroundCardsClicksHandler(e: Event) {
    if (!(e.target as HTMLElement).classList.contains('choose-background_card')) return;
    const bgNum: string = (e.target as HTMLElement).dataset.bgnum as string;
    this.storage.storage.bgNum = bgNum;
    this.renderBackground(bgNum);
  }

  renderBackground(bgNum?: string): void {
    const number = bgNum || JSON.parse(localStorage.getItem('storage')!).bgNum || '1';
    this.treeColumn.className = `tree-column background__${number}`;
  }
}

export { Settings };

import { Tree, ITree } from '../tree/tree';

class Settings {
  private chooseTreeWrapper: HTMLElement;
  private tree: ITree;

  constructor() {
    this.chooseTreeWrapper = document.querySelector('.choose-tree_cards') as HTMLElement;
    this.tree = new Tree();
  }

  addListener(): void {
    this.chooseTreeWrapper.addEventListener('click', (e) => this.tree.treeCardsClicksHandler(e));
  }
}

export { Settings };

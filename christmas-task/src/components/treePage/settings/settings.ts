import { Tree, ITree } from '../tree/tree';
import { LocalStorage, ILocalStorage } from '../../localStorage/storage';

const audio = new Audio();
audio.src = '../public/audio/audio.mp3';
let isPlay = false;

class Settings {
  private chooseTreeWrapper: HTMLElement;
  private chooseBackground: HTMLElement;
  private treeColumn: HTMLElement;
  private soundBtn: HTMLButtonElement;
  private tree: ITree;
  private storage: ILocalStorage;

  constructor() {
    this.chooseTreeWrapper = document.querySelector('.choose-tree_cards') as HTMLElement;
    this.chooseBackground = document.querySelector('.choose-background_cards') as HTMLElement;
    this.treeColumn = document.querySelector('.tree-column') as HTMLElement;
    this.soundBtn = document.querySelector('.sound-btn') as HTMLButtonElement;
    this.tree = new Tree();
    this.storage = new LocalStorage();
  }

  addListener(): void {
    this.chooseTreeWrapper.addEventListener('click', (e) => this.tree.treeCardsClicksHandler(e));
    this.chooseBackground.addEventListener('click', (e) => this.backgroundCardsClicksHandler(e));
    this.soundBtn.addEventListener('click', () => this.toggleMusic());
    window.addEventListener('DOMContentLoaded', () => this.checkMusic(this.storage.storage.isPlay));
  }

  checkMusic(isPlay?: boolean): void {
    if (isPlay) {
      window.addEventListener('click', this.playMusicOnce);
    }
  }

  removeListener() {
    window.removeEventListener('click', this.playMusicOnce);
  }

  playMusicOnce = () => {
    this.toggleMusic();
    this.removeListener();
  };

  toggleMusic(): void {
    this.soundBtn.classList.toggle('active');
    console.log(audio);
    if (isPlay) {
      audio.pause();
      isPlay = false;
      this.storage.storage.isPlay = false;
    } else {
      audio.currentTime = 0;
      audio.play();
      isPlay = true;
      this.storage.storage.isPlay = true;
    }
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

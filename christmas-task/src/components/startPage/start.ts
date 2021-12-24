import { Navigation, INavigation } from '../header/nav';

export default class Start {
  private startBtn: HTMLButtonElement;
  private navigation: INavigation;

  constructor() {
    this.startBtn = document.querySelector('.start-btn') as HTMLButtonElement;
    this.navigation = new Navigation();
  }

  addListener() {
    this.startBtn.addEventListener('click', () => this.navigation.openPage(this.startBtn.dataset.page!));
  }
}

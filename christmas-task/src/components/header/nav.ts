import { Select } from '../toysPage/cards/selectCards';
import { Selected, ISelected } from '../treePage/selected/selected';
import { ISearch } from './search';

interface INavigation {
  addListener(): void;
  openPage(targetPage: string): void;
  navClicksHandler(e: Event): void;
}

class Navigation implements INavigation {
  private startPage: HTMLElement;
  private toysPage: HTMLElement;
  private treePage: HTMLElement;
  private navBar: HTMLElement;
  private navLinks: HTMLElement[];
  private selected: ISelected;

  constructor() {
    this.startPage = document.querySelector('.start-page') as HTMLElement;
    this.toysPage = document.querySelector('.toys-page') as HTMLElement;
    this.treePage = document.querySelector('.tree-page') as HTMLElement;
    this.navBar = document.querySelector('.nav') as HTMLElement;
    this.navLinks = Array.from(document.querySelectorAll('.nav_link')) as HTMLElement[];
    this.selected = new Selected();
  }

  addListener() {
    this.navBar.addEventListener('click', (e) => this.navClicksHandler(e));
  }

  navClicksHandler(e: Event): void {
    if (!(e.target as HTMLElement).classList.contains('nav_link')) return;
    const pageName = (e.target as HTMLElement).dataset.page!;
    if (pageName === 'tree') this.selected.renderSelectedToys();
    this.openPage(pageName);
  }

  private highlightNavLink(pageName: string): void {
    this.navLinks.forEach((item) => {
      item.classList.remove('active');
      if (item.dataset.page === pageName && item.dataset.page !== 'start') item.classList.add('active');
    });
  }

  openPage(pageName: string): void {
    const targetPage = pageName === 'start' ? this.startPage : pageName === 'toys' ? this.toysPage : this.treePage;
    const pages = document.querySelectorAll('.page');
    const currentPage = Array.from(pages).filter((item) => !item.classList.contains('hide'))[0];
    currentPage.classList.add('hide');
    this.highlightNavLink(pageName);
    setTimeout(() => this.changePage(currentPage as HTMLElement, targetPage as HTMLElement), 150);
  }

  private changePage(previousPage: HTMLElement, nextPage: HTMLElement): void {
    previousPage.classList.add('remove');
    nextPage.classList.remove('remove');
    setTimeout(() => nextPage.classList.remove('hide'), 50);
  }
}

export { Navigation, INavigation };

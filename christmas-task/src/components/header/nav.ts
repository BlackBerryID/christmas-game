interface INavigation {
  addListener(): void;
  openPage(targetPage: string): void;
}

class Navigation implements INavigation {
  private startPage: HTMLElement;
  private toysPage: HTMLElement;
  private startBtn: HTMLButtonElement;

  constructor() {
    this.startPage = document.querySelector('.start-page') as HTMLElement;
    this.toysPage = document.querySelector('.toys-page') as HTMLElement;
    this.startBtn = document.querySelector('.start-button') as HTMLButtonElement;
  }

  addListener() {}

  openPage(pageName: string): void {
    const targetPage = pageName === 'start' ? this.startPage : this.toysPage;
    const pages = document.querySelectorAll('.page');
    const currentPage = Array.from(pages).filter((item) => !item.classList.contains('hide'))[0];
    currentPage.classList.add('hide');
    setTimeout(() => this.changePage(currentPage as HTMLElement, targetPage as HTMLElement), 150);
  }

  private changePage(previousPage: HTMLElement, nextPage: HTMLElement): void {
    previousPage.classList.add('remove');
    nextPage.classList.remove('remove');
    setTimeout(() => nextPage.classList.remove('hide'), 50);
  }
}

export { Navigation, INavigation };

import { LocalStorage, ILocalStorage } from '../../localStorage/storage';

class Snow {
  private snowContainer: HTMLElement;
  private snowBtn: HTMLButtonElement;
  private storage: ILocalStorage;
  private interval?: number;

  constructor() {
    this.snowContainer = document.querySelector('.snowflakes') as HTMLElement;
    this.snowBtn = document.querySelector('.snow-btn') as HTMLButtonElement;
    this.interval;
    this.storage = new LocalStorage();
  }

  addListener(): void {
    this.snowBtn.addEventListener('click', () => this.toggleSnow());
    window.addEventListener('DOMContentLoaded', () => this.checkSnow(this.storage.storage.isSnowActive));
  }

  private checkSnow(isSnowActive?: boolean): void {
    if (isSnowActive) {
      this.toggleSnow();
    }
  }

  toggleSnow() {
    if (!this.snowBtn.classList.contains('active')) {
      this.interval = window.setInterval(() => this.createSnowFlake(), 50);
      this.storage.storage.isSnowActive = true;
      this.snowBtn.classList.add('active');
    } else {
      clearInterval(this.interval);
      const snowflakes = this.snowContainer.querySelectorAll('.snowflake');
      snowflakes.forEach((item) => item.remove());
      this.storage.storage.isSnowActive = false;
      this.snowBtn.classList.remove('active');
    }
  }

  private createSnowFlake(): void {
    console.log(this.snowContainer.style.width);
    const snowFlake = document.createElement('div');
    snowFlake.classList.add('snowflake');
    snowFlake.style.left = Math.random() * this.snowContainer.offsetWidth + 'px';
    snowFlake.style.animationDuration = Math.random() * 3 + 2 + 's'; // between 2 - 5 seconds
    snowFlake.style.opacity = String(Math.random());
    snowFlake.style.backgroundSize = Math.random() * 10 + 10 + 'px';

    this.snowContainer.append(snowFlake);

    setTimeout(() => {
      snowFlake.remove();
    }, 5000);
  }
}

export { Snow };

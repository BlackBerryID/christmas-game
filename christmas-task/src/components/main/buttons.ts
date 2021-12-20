import { LocalStorage, ILocalStorage } from '../main/storage';
import { sliderAmount, sliderYear } from '../noUiSlider/slider';

class Buttons {
  private resetFiltersButton: HTMLElement;
  private resetSettingsButton: HTMLElement;
  private storage: ILocalStorage;
  private shapeItems: NodeList;
  private colorItems: NodeList;
  private sizeItems: NodeList;
  private favoriteItem: HTMLElement;

  constructor() {
    this.resetFiltersButton = document.querySelector('.filters') as HTMLElement;
    this.resetSettingsButton = document.querySelector('.settings') as HTMLElement;
    this.storage = new LocalStorage();
    this.shapeItems = document.querySelectorAll('.shape-item') as NodeList;
    this.colorItems = document.querySelectorAll('.color-item') as NodeList;
    this.sizeItems = document.querySelectorAll('.size-item') as NodeList;
    this.favoriteItem = document.querySelector('.favorite-item') as HTMLElement;
  }

  addListener() {
    this.resetFiltersButton.addEventListener('click', () => this.resetFilters());
    this.resetSettingsButton.addEventListener('click', () => this.resetSettings());
  }

  resetFilters() {
    console.log(this.storage.storage);
    sliderAmount.noUiSlider?.set([1, 12]);
    sliderYear.noUiSlider?.set([1940, 2020]);
    (this.storage.storage.shapes as Set<string>).clear();
    (this.storage.storage.colors as Set<string>).clear();
    (this.storage.storage.sizes as Set<string>).clear();
    this.storage.storage.isFavorite = false;
    this.shapeItems.forEach((item) => (item as HTMLElement).classList.remove('active'));
    this.colorItems.forEach((item) => ((item as HTMLInputElement).checked = false));
    this.sizeItems.forEach((item) => ((item as HTMLInputElement).checked = false));
    (this.favoriteItem as HTMLInputElement).checked = false;
  }

  resetSettings() {
    console.log('settings');
  }
}

export { Buttons };

import { LocalStorage, ILocalStorage } from '../../localStorage/storage';
import { sliderAmount, sliderYear } from '../noUiSlider/slider';
import { Cards } from '../cards/renderCards';
import { Filters } from './filters';
import { Selected, ISelected } from '../../treePage/selected/selected';
import { Tree, ITree } from '../../treePage/tree/tree';
import { Settings } from '../../treePage/settings/settings';
import { Garland, IGarland } from '../../treePage/garland/garland';

interface IButtons {
  addListener(): void;
  resetSettings(): void;
}

class Buttons implements IButtons {
  private resetFiltersButton: HTMLElement;
  private resetSettingsButton: HTMLElement;
  private shapeItems: NodeList;
  private colorItems: NodeList;
  private sizeItems: NodeList;
  private favoriteItem: HTMLElement;
  private select: HTMLElement;
  private storage: ILocalStorage;
  private selected: ISelected;
  private tree: ITree;
  private garland: IGarland;

  constructor() {
    this.resetFiltersButton = document.querySelector('.filters') as HTMLElement;
    this.resetSettingsButton = document.querySelector('.settings') as HTMLElement;
    this.shapeItems = document.querySelectorAll('.shape-item') as NodeList;
    this.colorItems = document.querySelectorAll('.color-item') as NodeList;
    this.sizeItems = document.querySelectorAll('.size-item') as NodeList;
    this.favoriteItem = document.querySelector('.favorite-item') as HTMLElement;
    this.select = document.querySelector('.select_list') as HTMLElement;
    this.storage = new LocalStorage();
    this.selected = new Selected();
    this.tree = new Tree();
    this.garland = new Garland();
  }

  addListener(): void {
    this.resetFiltersButton.addEventListener('click', () => this.resetFilters());
    this.resetSettingsButton.addEventListener('click', () => this.resetSettings());
  }

  private resetFilters() {
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

  resetSettings(): void {
    const settings = new Settings();
    if (this.storage.storage.isPlay) settings.toggleMusic();
    this.storage.storage = {};
    localStorage.clear();
    (this.select as HTMLSelectElement).selectedIndex = 0;
    const cards = new Cards();
    cards.renderCards();
    const filters = new Filters();
    filters.checkFiltersAfterPageLoad();
    this.selected.renderSelectedToys();
    this.tree.clearTree();
    this.tree.renderTree();
    settings.renderBackground();
    settings.garlandToggleBtn.checked = false;
    this.garland.toggleGarland();
  }
}

export { Buttons, IButtons };

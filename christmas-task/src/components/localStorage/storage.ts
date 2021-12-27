interface IStorage {
  sortMethod?: string;
  sliderAmount?: number[];
  sliderYear?: number[];
  shapes?: Set<string> | string[];
  colors?: Set<string> | string[];
  sizes?: Set<string> | string[];
  isFavorite?: boolean;
  selected?: Set<string> | string[];
  treeNum?: string;
  bgNum?: string;
  isPlay?: boolean;
}

interface ILocalStorage {
  storage: IStorage;
  setLocalStorage(): void;
  addListener(): void;
  getLocalStorage(): IStorage;
}

class LocalStorage implements ILocalStorage {
  static instance: ILocalStorage;
  static exists: boolean;
  storage!: IStorage;

  constructor() {
    if (LocalStorage.exists) return LocalStorage.instance;

    LocalStorage.instance = this;
    LocalStorage.exists = true;
    this.storage = {};
  }

  addListener(): void {
    window.addEventListener('beforeunload', () => this.setLocalStorage());
    window.addEventListener('DOMContentLoaded', () => this.getLocalStorage());
  }

  getLocalStorage(): IStorage {
    this.storage = JSON.parse(localStorage.getItem('storage') as string) || {};
    this.storage.colors = new Set(this.storage.colors);
    this.storage.shapes = new Set(this.storage.shapes);
    this.storage.sizes = new Set(this.storage.sizes);
    this.storage.selected = new Set(this.storage.selected);
    return this.storage;
  }

  setLocalStorage(): void {
    this.storage.colors = Array.from(this.storage.colors!);
    this.storage.shapes = Array.from(this.storage.shapes!);
    this.storage.sizes = Array.from(this.storage.sizes!);
    this.storage.selected = Array.from(this.storage.selected!);
    localStorage.setItem('storage', JSON.stringify(this.storage));
  }
}

export { LocalStorage, ILocalStorage };

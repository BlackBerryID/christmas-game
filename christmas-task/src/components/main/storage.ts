interface IInstance {
  storage: IStorage;
}

interface IStorage {
  sortMethod?: string;
  sliderAmount?: number[];
  sliderYear?: number[];
}

interface ILocalStorage {
  storage: IStorage;
}

class LocalStorage implements ILocalStorage {
  static instance: IInstance;
  static exists: boolean;
  storage!: IStorage;

  constructor() {
    if (LocalStorage.exists) return LocalStorage.instance;

    LocalStorage.instance = this;
    LocalStorage.exists = true;
    this.storage = JSON.parse(localStorage.getItem('storage') as string) || {};
  }
}

export { LocalStorage, ILocalStorage };

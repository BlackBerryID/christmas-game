import { IData } from './renderCards';

interface ISort {
  sortCards(array: IData[]): IData[];
}

class Sort implements ISort {
  sortCards(array: IData[]): IData[] {
    const method = localStorage.getItem('sortMethod') || 0;
    let result;
    switch (method) {
      case 0:
        result = array.sort((a, b) => (a.name > b.name ? 1 : -1));
        break;
      case 1:
        result = array.sort((a, b) => (a.name > b.name ? -1 : 1));
        break;
      case 2:
        result = array.sort((a, b) => (a.count > b.count ? 1 : -1));
        break;
      case 3:
        result = array.sort((a, b) => (a.count > b.count ? -1 : 1));
        break;
    }
    return result as IData[];
  }
}

export { Sort, ISort };

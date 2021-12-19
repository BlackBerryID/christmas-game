type TData = [...string[], boolean];

// interface IData {
//   num: string;
//   name: string;
//   count: string;
//   year: string;
//   shape: string;
//   color: string;
//   size: string;
//   favorite: boolean;
// }

export default class Data {
  // public data
  async getData(): Promise<TData[]> {
    const res: Response = await fetch('../public/data.json');
    const list: TData[] = await res.json();
    return list;
  }
}

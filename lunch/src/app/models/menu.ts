export interface IMenu {
  date: string;
  items: IItems[];
}

export interface IItems {
  category: string;
  description: string;
  id: string;
  name:string;
  vendor: string;
}

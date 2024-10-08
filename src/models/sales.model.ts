export interface Sale {
  _id?: string; // O _id pode ser opcional se você não estiver passando ao criar
  productName: string;
  amount: number;
  price: number;
  date: Date;
}

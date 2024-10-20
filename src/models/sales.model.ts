export interface Sale {
  _id?: string;         // O _id pode ser opcional se você não estiver passando ao criar
  productId: string;    // Certifique-se de que esta propriedade exista
  productName: string;
  amount: number;
  price: number;
  date: Date;
}

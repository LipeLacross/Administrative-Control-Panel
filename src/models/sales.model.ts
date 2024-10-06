export interface Sale {
  _id?: string; // Defina como opcional se o backend gerar o ID
  productName: string;
  amount: number;
  date: Date;
}

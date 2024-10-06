export interface InventoryItem {
  _id?: string; // Adicione '?' para permitir valores indefinidos
  name: string;
  quantity: number;
  price: number;
}

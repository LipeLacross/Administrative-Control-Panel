import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../../services/inventory.service';
import { InventoryItem } from '../../../models/inventory.model';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  items: InventoryItem[] = [];
  searchTerm: string = ''; // Para a barra de pesquisa

  constructor(private inventoryService: InventoryService) { }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.inventoryService.getItems().subscribe(
      (data: InventoryItem[]) => {
        this.items = data;
      },
      (error) => console.error('Erro ao carregar o inventário', error)
    );
  }

  addItem(name: string, quantity: string, price: string): void {
    const quantityNum = parseInt(quantity, 10); // Convertendo para número
    const priceNum = parseFloat(price); // Convertendo para número

    // Verificar se o nome do item já existe
    const existingItem = this.items.find(item => item.name.toLowerCase() === name.toLowerCase());
    if (existingItem) {
      console.error('Produto com esse nome já existe');
      return; // Impede a adição de itens duplicados
    }

    const newItem: InventoryItem = { name, quantity: quantityNum, price: priceNum }; // Removido o _id
    this.inventoryService.addItem(newItem).subscribe(
      (item: InventoryItem) => {
        this.items.push(item);
      },
      (error) => console.error('Erro ao adicionar item', error)
    );
  }

  updateItem(id: string, name: string, quantity: number, price: number): void {
    const updatedItem: InventoryItem = { _id: id, name, quantity, price };
    const index = this.items.findIndex(item => item._id === id);

    this.inventoryService.updateItem(id, updatedItem).subscribe(
      () => {
        // Atualiza o item no array sem sobrescrever _id
        this.items[index] = updatedItem;
      },
      (error) => console.error('Erro ao atualizar item', error)
    );
  }

  deleteItem(id: string): void {
    this.inventoryService.deleteItem(id).subscribe(
      () => {
        this.items = this.items.filter(item => item._id !== id);
      },
      (error) => console.error('Erro ao deletar item', error)
    );
  }

  // Função para filtrar os itens com base na pesquisa
  get filteredItems(): InventoryItem[] {
    return this.items.filter(item =>
      item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}

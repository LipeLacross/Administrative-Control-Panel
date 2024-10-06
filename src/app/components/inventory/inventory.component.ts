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

  constructor(private inventoryService: InventoryService) { }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.inventoryService.getItems().subscribe(
      (data: InventoryItem[]) => this.items = data,
      (error) => console.error('Erro ao carregar os itens do inventário', error)
    );
  }

  addItem(name: string, quantity: number, price: number): void {
    const newItem: InventoryItem = { name, quantity, price };
    this.inventoryService.addItem(newItem).subscribe(
      (item: InventoryItem) => {
        this.items.push(item);
      },
      (error) => console.error('Erro ao adicionar o item', error)
    );
  }

  updateItem(id: string, name: string, quantity: number, price: number): void {
    const updatedItem: InventoryItem = { name, quantity, price };
    this.inventoryService.updateItem(id, updatedItem).subscribe(
      () => {
        const index = this.items.findIndex(item => item._id === id);
        if (index !== -1) {
          this.items[index] = { _id: id, ...updatedItem };
        }
      },
      (error) => console.error('Erro ao atualizar o item', error)
    );
  }

  deleteItem(id: string): void {
    this.inventoryService.deleteItem(id).subscribe(
      () => {
        this.items = this.items.filter(item => item._id !== id);
      },
      (error) => console.error('Erro ao deletar o item', error)
    );
  }
}

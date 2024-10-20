import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../../services/inventory.service';
import { SalesService } from '../../../services/sales.service';
import { InventoryItem } from '../../../models/inventory.model';
import { Sale } from '../../../models/sales.model';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  items: InventoryItem[] = [];
  searchTerm: string = '';

  constructor(
    private inventoryService: InventoryService,
    private salesService: SalesService
  ) { }

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
    const quantityNum = parseInt(quantity, 10);
    const priceNum = parseFloat(price);

    const existingItem = this.items.find(item => item.name.toLowerCase() === name.toLowerCase());
    if (existingItem) {
      console.error('Produto com esse nome já existe');
      alert('Produto com esse nome já existe');
      return;
    }

    const newItem: InventoryItem = { name, quantity: quantityNum, price: priceNum };
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
        this.items[index] = updatedItem;
      },
      (error) => console.error('Erro ao atualizar item', error)
    );
  }

  deleteItem(id: string | undefined): void {
    if (!id) return;

    this.inventoryService.deleteItem(id).subscribe(
      () => {
        console.log('Item deletado com sucesso');
        this.salesService.getSalesByProductId(id).subscribe(
          (sales: Sale[]) => {
            if (sales.length > 0) {
              sales.forEach((sale: Sale) => {
                this.salesService.deleteSale(sale._id!).subscribe(
                  () => {
                    console.log('Venda deletada:', sale._id);
                  },
                  (error: any) => {
                    console.error('Erro ao deletar venda', error);
                  }
                );
              });
            } else {
              console.log('Nenhuma venda encontrada para deletar.');
            }
          },
          (error: any) => {
            console.error('Erro ao buscar vendas relacionadas', error);
          }
        );

        this.items = this.items.filter(item => item._id !== id);
      },
      (error) => console.error('Erro ao deletar item', error)
    );
  }

  get filteredItems(): InventoryItem[] {
    return this.items.filter(item =>
      item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}

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
  newItem: InventoryItem = { id: 0, name: '', quantity: 0, price: 0 };

  constructor(private inventoryService: InventoryService) { }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.inventoryService.getItems().subscribe(items => this.items = items);
  }

  addItem(): void {
    this.inventoryService.addItem(this.newItem).subscribe(() => {
      this.loadItems();
      this.newItem = { id: 0, name: '', quantity: 0, price: 0 };
    });
  }

  deleteItem(id: number): void {
    this.inventoryService.deleteItem(id).subscribe(() => this.loadItems());
  }
}

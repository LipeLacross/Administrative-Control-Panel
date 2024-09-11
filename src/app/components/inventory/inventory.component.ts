import { Component } from '@angular/core';
import { InventoryItem } from '../../../models/inventory.model';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent {
  items: InventoryItem[] = [
    { id: 1, name: 'Item 1', quantity: 10, price: 100 },
    { id: 2, name: 'Item 2', quantity: 20, price: 200 }
  ];
}

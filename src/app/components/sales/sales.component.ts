import { Component } from '@angular/core';
import { Sale } from '../../../models/sales.model';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent {
  sales: Sale[] = [
    { id: 1, productName: 'Item A', amount: 100, date: new Date() },
    { id: 2, productName: 'Item B', amount: 200, date: new Date() }
  ];
}

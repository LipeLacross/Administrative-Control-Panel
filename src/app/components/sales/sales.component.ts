import { Component, OnInit } from '@angular/core';
import { SalesService } from '../../../services/sales.service';
import { Sale } from '../../../models/sales.model';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {
  sales: Sale[] = [];
  newSale: Sale = { id: 0, productName: '', amount: 0, date: new Date() };

  constructor(private salesService: SalesService) { }

  ngOnInit(): void {
    this.loadSales();
  }

  loadSales(): void {
    this.salesService.getSales().subscribe(sales => this.sales = sales);
  }

  addSale(): void {
    this.salesService.addSale(this.newSale).subscribe(() => {
      this.loadSales();
      this.newSale = { id: 0, productName: '', amount: 0, date: new Date() };
    });
  }

  deleteSale(id: number): void {
    this.salesService.deleteSale(id).subscribe(() => this.loadSales());
  }
}

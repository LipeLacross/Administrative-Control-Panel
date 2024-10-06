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

  constructor(private salesService: SalesService) { }

  ngOnInit(): void {
    this.loadSales();
  }

  loadSales(): void {
    this.salesService.getSales().subscribe(
      (data: Sale[]) => this.sales = data,
      (error) => console.error('Erro ao carregar as vendas', error)
    );
  }

  addSale(productName: string | undefined, amount: number | undefined): void {
    // Validação básica
    if (!productName || !amount) {
      console.error('Nome do produto ou quantidade inválida');
      return;
    }

    const newSale: Sale = { productName, amount, date: new Date() };
    this.salesService.addSale(newSale).subscribe(
      (sale: Sale) => {
        this.sales.push(sale);
      },
      (error) => console.error('Erro ao adicionar a venda', error)
    );
  }

  updateSale(id: string | undefined, productName: string | undefined, amount: number | undefined): void {
    // Verificação para evitar parâmetros indefinidos
    if (!id || !productName || amount === undefined) {
      console.error('Valores inválidos para a atualização');
      return;
    }

    const updatedSale: Sale = { productName, amount, date: new Date() };
    this.salesService.updateSale(id, updatedSale).subscribe(
      () => {
        const index = this.sales.findIndex(sale => sale._id === id);
        if (index !== -1) {
          this.sales[index] = { _id: id, ...updatedSale };
        }
      },
      (error) => console.error('Erro ao atualizar a venda', error)
    );
  }

  deleteSale(id: string | undefined): void {
    if (!id) {
      console.error('ID inválido para deletar');
      return;
    }

    this.salesService.deleteSale(id).subscribe(
      () => {
        this.sales = this.sales.filter(sale => sale._id !== id);
      },
      (error) => console.error('Erro ao deletar a venda', error)
    );
  }
}

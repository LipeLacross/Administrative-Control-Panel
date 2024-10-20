import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../../services/inventory.service';
import { SalesService } from '../../../services/sales.service';
import { InventoryItem } from '../../../models/inventory.model';
import { Sale } from '../../../models/sales.model';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {
  inventoryItems: InventoryItem[] = [];
  sales: Sale[] = [];
  selectedProductId: string | undefined;
  quantity: number = 0; // Valor padrão
  errorMessage: string = '';

  constructor(
    private inventoryService: InventoryService,
    private salesService: SalesService
  ) { }

  ngOnInit(): void {
    this.loadInventoryItems();
    this.loadSales();
  }

  loadInventoryItems(): void {
    this.inventoryService.getItems().subscribe(
      (data: InventoryItem[]) => {
        this.inventoryItems = data;
      },
      (error) => console.error('Erro ao carregar itens do inventário', error)
    );
  }

  loadSales(): void {
    this.salesService.getSales().subscribe(
      (data: Sale[]) => {
        this.sales = data;
      },
      (error) => console.error('Erro ao carregar vendas', error)
    );
  }

  get totalSalesValue(): number {
    return this.sales.reduce((total, sale) => total + (sale.price * sale.amount), 0);
  }

  onProductSelect(event: any): void {
    this.selectedProductId = event.target.value;
  }

  addSale(): void {
    if (!this.selectedProductId) {
      this.errorMessage = 'Por favor, selecione um produto.';
      return;
    }

    if (this.quantity <= 0) {
      this.errorMessage = 'Por favor, insira uma quantidade válida.';
      return;
    }

    const selectedItem = this.inventoryItems.find(item => item._id === this.selectedProductId);
    if (!selectedItem) {
      this.errorMessage = 'Produto não encontrado no inventário.';
      return;
    }

    const newSale: Sale = {
      productId: this.selectedProductId,
      productName: selectedItem.name,
      amount: this.quantity,
      price: selectedItem.price,
      date: new Date()
    };

    this.salesService.addSale(newSale).subscribe(
      (sale: Sale) => {
        this.sales.push(sale);
        this.errorMessage = ''; // Limpa a mensagem de erro
        this.loadInventoryItems(); // Atualiza os itens do inventário
      },
      (error) => {
        console.error('Erro ao adicionar venda', error);
        this.errorMessage = 'Erro ao adicionar venda.';
      }
    );
  }

  deleteSale(saleId: string | undefined): void {
    if (!saleId) return;

    this.salesService.deleteSale(saleId).subscribe(
      () => {
        console.log('Venda deletada com sucesso');
        this.sales = this.sales.filter(sale => sale._id !== saleId);
      },
      (error) => {
        console.error('Erro ao deletar venda', error);
      }
    );
  }

  // Método para calcular o valor total da venda específica
  getSaleTotalPrice(sale: Sale): number {
    return sale.amount * sale.price;
  }
}

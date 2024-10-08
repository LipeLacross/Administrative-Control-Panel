import { Component, OnInit } from '@angular/core';
import { SalesService } from '../../../services/sales.service';
import { InventoryService } from '../../../services/inventory.service';
import { Sale } from '../../../models/sales.model';
import { InventoryItem } from '../../../models/inventory.model';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {
  sales: Sale[] = [];
  inventoryItems: InventoryItem[] = [];
  totalSalesValue: number = 0;
  errorMessage: string = '';
  selectedProductId: string = '';
  quantity: number = 1;

  constructor(
    private salesService: SalesService,
    private inventoryService: InventoryService
  ) {}

  ngOnInit(): void {
    this.loadSales();
    this.loadInventory();
  }

  loadSales(): void {
    this.salesService.getSales().subscribe(
      (data: Sale[]) => {
        this.sales = data;
        this.calculateTotalSalesValue();
      },
      (error) => console.error('Erro ao carregar as vendas', error)
    );
  }

  loadInventory(): void {
    this.inventoryService.getItems().subscribe(
      (data: InventoryItem[]) => {
        this.inventoryItems = data;
        console.log('Inventário carregado:', this.inventoryItems); // Debug
      },
      (error) => console.error('Erro ao carregar o inventário', error)
    );
  }

  addSale(): void {
    const selectedProduct = this.inventoryItems.find(item => item._id === this.selectedProductId);

    if (!selectedProduct) {
      this.errorMessage = 'Produto não encontrado no inventário';
      return;
    }

    if (this.quantity > selectedProduct.quantity) {
      this.errorMessage = 'Quantidade de venda excede o estoque';
      return;
    }

    // Use o preço do produto selecionado do inventário
    const price = selectedProduct.price; // Preço do item no inventário
    console.log('Preço do produto selecionado:', price); // Debug

    // Verifique se o preço é válido
    if (isNaN(price) || price <= 0) {
      this.errorMessage = 'Preço inválido do produto';
      return;
    }

    const newSale: Sale = {
      productName: selectedProduct.name,
      amount: this.quantity,
      price: price, // Preço do produto selecionado
      date: new Date()
    };

    this.salesService.addSale(newSale).subscribe(
      (sale: Sale) => {
        console.log('Venda adicionada:', sale); // Debug
        this.sales.push(sale);
        selectedProduct.quantity -= this.quantity;

        if (selectedProduct._id) {
          this.updateInventory(selectedProduct._id, selectedProduct);
        }

        this.calculateTotalSalesValue();
      },
      (error) => {
        console.error('Erro ao adicionar a venda', error);
        this.errorMessage = 'Erro ao adicionar a venda. Tente novamente mais tarde.';
      }
    );
  }

  deleteSale(id: string): void {
    if (!id) return;

    const saleToDelete = this.sales.find(sale => sale._id === id);
    if (!saleToDelete) return;

    this.salesService.deleteSale(id).subscribe(
      () => {
        const product = this.inventoryItems.find(item => item.name === saleToDelete.productName);
        if (product) {
          product.quantity += saleToDelete.amount;
          if (product._id) {
            this.updateInventory(product._id, product);
          }
        }
        this.sales = this.sales.filter(sale => sale._id !== id);
        this.calculateTotalSalesValue();
      },
      (error) => {
        console.error('Erro ao deletar a venda', error);
        this.errorMessage = 'Erro ao deletar a venda. Tente novamente mais tarde.';
      }
    );
  }

  calculateTotalSalesValue(): void {
    // Verifique se há vendas antes de calcular
    if (this.sales.length === 0) {
      this.totalSalesValue = 0;
      return;
    }

    // Calcule o total de vendas
    this.totalSalesValue = this.sales.reduce((total, sale) => {
      const salePrice = sale.price || 0; // Use 0 se o preço for nulo
      const saleAmount = sale.amount || 0; // Use 0 se a quantidade for nula
      return total + (salePrice * saleAmount); // Assegure-se de que ambos são numéricos
    }, 0);

    console.log('Valor Total de Vendas:', this.totalSalesValue); // Debug
  }

  updateInventory(id: string, item: InventoryItem): void {
    this.inventoryService.updateItem(id, item).subscribe(
      () => console.log('Estoque atualizado'),
      (error) => console.error('Erro ao atualizar o inventário', error)
    );
  }

  onProductSelect(event: Event): void {
    const target = event.target as HTMLSelectElement;
    if (target) {
      this.selectedProductId = target.value;
      this.errorMessage = '';
    }
  }
}

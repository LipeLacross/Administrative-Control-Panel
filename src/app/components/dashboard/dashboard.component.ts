import { Component, OnInit } from '@angular/core';
import { SalesService } from '../../../services/sales.service';
import { InventoryService } from '../../../services/inventory.service';
import { ReportsService } from '../../../services/reports.service';
import { Sale } from '../../../models/sales.model';
import { InventoryItem } from '../../../models/inventory.model';
import { Report } from '../../../models/reports.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalSalesValue: number = 0;
  totalInventoryItems: number = 0;
  latestReports: Report[] = [];
  topSellingProduct: string = '';
  lowStockItems: InventoryItem[] = [];
  monthlySales: number[] = [];
  errorMessage: string = '';

  constructor(
    private salesService: SalesService,
    private inventoryService: InventoryService,
    private reportsService: ReportsService
  ) { }

  ngOnInit(): void {
    this.loadTotalSalesValue();
    this.loadTotalInventoryItems();
    this.loadLatestReports();
    this.loadTopSellingProduct();
    this.loadLowStockItems();
    this.loadMonthlySales();
  }

  loadTotalSalesValue(): void {
    this.salesService.getSales().subscribe(
      (sales: Sale[]) => {
        this.totalSalesValue = sales.reduce((total, sale) => total + (sale.price * sale.amount), 0);
      },
      (error) => {
        console.error('Erro ao carregar o valor total das vendas', error);
        this.errorMessage = 'Erro ao carregar o valor total das vendas.';
      }
    );
  }

  loadTotalInventoryItems(): void {
    this.inventoryService.getItems().subscribe(
      (items: InventoryItem[]) => {
        this.totalInventoryItems = items.length;
      },
      (error) => {
        console.error('Erro ao carregar o inventário', error);
        this.errorMessage = 'Erro ao carregar o inventário.';
      }
    );
  }

  loadLatestReports(): void {
    this.reportsService.getReports().subscribe(
      (reports: Report[]) => {
        this.latestReports = reports.slice(-5); // Pega os 5 relatórios mais recentes
      },
      (error) => {
        console.error('Erro ao carregar relatórios', error);
        this.errorMessage = 'Erro ao carregar relatórios.';
      }
    );
  }

  loadTopSellingProduct(): void {
    this.salesService.getSales().subscribe(
      (sales: Sale[]) => {
        const productSales = sales.reduce((acc, sale) => {
          acc[sale.productName] = (acc[sale.productName] || 0) + sale.amount;
          return acc;
        }, {} as { [key: string]: number });

        this.topSellingProduct = Object.keys(productSales).reduce((a, b) => productSales[a] > productSales[b] ? a : b, '');
      },
      (error) => {
        console.error('Erro ao carregar o produto mais vendido', error);
        this.errorMessage = 'Erro ao carregar o produto mais vendido.';
      }
    );
  }

  loadLowStockItems(): void {
    this.inventoryService.getItems().subscribe(
      (items: InventoryItem[]) => {
        this.lowStockItems = items.filter(item => item.quantity < 10); // Considera itens com menos de 10 unidades como baixo estoque
      },
      (error) => {
        console.error('Erro ao carregar itens com baixo estoque', error);
        this.errorMessage = 'Erro ao carregar itens com baixo estoque.';
      }
    );
  }

  loadMonthlySales(): void {
    this.salesService.getSales().subscribe(
      (sales: Sale[]) => {
        const salesByMonth = new Array(12).fill(0);
        sales.forEach(sale => {
          const month = new Date(sale.date).getMonth();
          salesByMonth[month] += sale.price * sale.amount;
        });
        this.monthlySales = salesByMonth;
      },
      (error) => {
        console.error('Erro ao carregar vendas mensais', error);
        this.errorMessage = 'Erro ao carregar vendas mensais.';
      }

    );

  }

  getMonthName(monthIndex: number): string {
    const months = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    return months[monthIndex];
  }

}

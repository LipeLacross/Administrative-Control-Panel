import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { ReportsComponent } from './components/reports/reports.component';
import { SalesComponent } from './components/sales/sales.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'inventory', component: InventoryComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'sales', component: SalesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

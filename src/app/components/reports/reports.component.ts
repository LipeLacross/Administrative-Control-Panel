import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../../services/reports.service';
import { Report } from '../../../models/reports.model';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  reports: Report[] = [];

  constructor(private reportsService: ReportsService) {}

  ngOnInit(): void {
    this.loadReports();
  }

  loadReports(): void {
    this.reportsService.getReports().subscribe(
      (data: Report[]) => this.reports = data,
      (error) => console.error('Erro ao carregar os relatórios', error)
    );
  }

  addReport(title: string | undefined, description: string | undefined): void {
    if (title && description) {
      const newReport: Report = { title, description, date: new Date() };
      this.reportsService.addReport(newReport).subscribe(
        (report: Report) => {
          this.reports.push(report);
        },
        (error) => console.error('Erro ao adicionar o relatório', error)
      );
    }
  }

  updateReport(id: string | undefined, title: string | undefined, description: string | undefined): void {
    if (id && title && description) {
      const updatedReport: Report = { title, description, date: new Date() };
      this.reportsService.updateReport(id, updatedReport).subscribe(
        () => {
          const index = this.reports.findIndex(report => report._id === id);
          if (index !== -1) {
            this.reports[index] = { _id: id, ...updatedReport };
          }
        },
        (error) => console.error('Erro ao atualizar o relatório', error)
      );
    }
  }

  deleteReport(id: string | undefined): void {
    if (id) {
      this.reportsService.deleteReport(id).subscribe(
        () => {
          this.reports = this.reports.filter(report => report._id !== id);
        },
        (error) => console.error('Erro ao deletar o relatório', error)
      );
    }
  }
}

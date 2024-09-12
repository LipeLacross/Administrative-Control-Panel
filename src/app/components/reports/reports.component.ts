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
  newReport: Report = { id: '', title: '', content: '' };

  constructor(private reportsService: ReportsService) { }

  ngOnInit(): void {
    this.loadReports();
  }

  loadReports(): void {
    this.reportsService.getReports().subscribe(reports => this.reports = reports);
  }

  addReport(): void {
    this.reportsService.addReport(this.newReport).subscribe(() => {
      this.loadReports();
      this.newReport = { id: '', title: '', content: '' };
    });
  }

  deleteReport(id: string): void {
    this.reportsService.deleteReport(id).subscribe(() => this.loadReports());
  }
}

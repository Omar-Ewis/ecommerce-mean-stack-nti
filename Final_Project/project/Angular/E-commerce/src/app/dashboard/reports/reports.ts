import { Component } from '@angular/core';
import { ReportService } from '../../core/services/dashboard-services/Reports/report-service';
import { CommonModule } from '@angular/common';
import { IReportData } from '../../core/models/report.model';

@Component({
  selector: 'app-reports',
  imports: [CommonModule],
  templateUrl: './reports.html',
  styleUrl: './reports.css'
})
export class Reports {
  isLoading = true;
  report!: IReportData;
  constructor(private _dashboardService: ReportService) {}

  ngOnInit(): void {
    this._dashboardService.getSalesReport().subscribe({
      next: (res) => {
        this.report = res.data; 
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }
}

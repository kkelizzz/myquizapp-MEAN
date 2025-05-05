import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReportService } from '../../report.service';

@Component({
  selector: 'app-admin-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-report.component.html',
  styleUrls:['./admin-report.component.css']
})
export class AdminReportComponent implements OnInit {
  reports: any[] = [];
  //testId!: string;
  errorMessage: string = '';

  constructor(private route: ActivatedRoute, private reportService: ReportService) {}

ngOnInit(): void {
  const testId = this.route.snapshot.paramMap.get('testId');

  if (testId) {
    this.reportService.getReportsByTest(testId).subscribe(
      (data) => {
        this.reports = data;

        // For each report, get rank
        this.reports.forEach((report, index) => {
          this.reportService.getUserRank(testId, report.userId._id).subscribe(
            (rankData) => {
              this.reports[index].rank = rankData.rank;
            },
            (error) => {
              console.error('Failed to fetch rank', error);
              this.reports[index].rank = 'N/A';
            }
          );
        });
      },
      (error) => {
        console.error('Error fetching reports', error);
        this.errorMessage = 'Failed to load reports';
      }
    );
  } else {
    this.errorMessage = 'Invalid test ID';
  }
}

deleteReport(reportId: string): void {
  if (confirm('Are you sure you want to delete this report?')) {
    this.reportService.deleteReport(reportId).subscribe({
      next: () => {
        this.reports = this.reports.filter(r => r._id !== reportId);
      },
      error: (err) => {
        console.error('Failed to delete report', err);
        alert('Could not delete the report.');
      }
    });
  }
}


}



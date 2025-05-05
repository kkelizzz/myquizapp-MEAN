import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportService } from '../../report.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-report',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-report.component.html',
  styleUrls:['./user-report.component.css']

})
export class UserReportComponent implements OnInit {
  reports: any[] = [];
  errorMessage = '';

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId'); // or from AuthService

    if (userId) {
      this.reportService.getUserReports(userId).subscribe(
        (data: any[]) => {
          this.reports = data;

          this.reports.forEach((report, index) => {
            this.reportService.getUserRank(report.testId._id, userId).subscribe(
              (rankData: any) => {
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
      this.errorMessage = 'User not logged in';
    }
  }

  getCircleClass(percentage: number): string {
    if (percentage >= 0.75) return 'circle high';
    if (percentage >= 0.5) return 'circle medium';
    return 'circle low';
  }
  
}

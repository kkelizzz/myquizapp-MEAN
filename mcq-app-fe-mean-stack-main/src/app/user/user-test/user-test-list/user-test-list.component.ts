// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { Router } from '@angular/router';
// import { TestService } from '../../../admin/test-management/test.service';
// import { MatDialog } from '@angular/material/dialog';
// import { ConfirmDialogComponent } from '../../../confirm-dialog/confirm-dialog.component';

// @Component({
//   selector: 'app-user-test-list',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './user-test-list.component.html'
// })
// export class UserTestListComponent implements OnInit {
//   tests: any[] = [];
//   errorMessage = '';

//   constructor(private testService: TestService, private router: Router,  private dialog: MatDialog) {}

//   ngOnInit(): void {
//     this.testService.getTests().subscribe({
//       next: (data) => (this.tests = data),
//       error: (err) => {
//         console.error('Failed to load tests', err);
//         this.errorMessage = 'Could not fetch tests';
//       }
//     });
//   }

//   startTest(testId: string): void {
//     const dialogRef = this.dialog.open(ConfirmDialogComponent, {
//       data: { message: 'Are you sure you want to start the test?' },
//     });
  
//     dialogRef.afterClosed().subscribe((confirmed: boolean) => {
//       if (confirmed) {
//         this.router.navigate(['/user/tests', testId]);
//       }
//     });
// }
// }

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TestService } from '../../../admin/test-management/test.service';
import { ReportService } from '../../../report.service';  // Add ReportService to fetch attempted tests
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-user-test-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-test-list.component.html',
  styleUrls:['./user-test-list.component.css']
})
export class UserTestListComponent implements OnInit {
  tests: any[] = [];
  attemptedTests: Set<string> = new Set(); // Store attempted test IDs
  errorMessage = '';

  constructor(
    private testService: TestService,
    private reportService: ReportService, // Inject ReportService
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId'); // Assuming user ID is stored in localStorage
    //console.log('User ID:', userId);

    if (!userId) {
      this.errorMessage = 'User not logged in';
      return;
    }

    // Fetch the list of tests and the user's reports
    this.testService.getTests().subscribe({
      next: (data) => {
        this.tests = data;
        // Fetch the user's test reports
        this.reportService.getUserReports(userId).subscribe({
          next: (reports: any[]) => {
            this.attemptedTests = new Set(reports.map(report => report.testId._id)); // Store attempted test IDs
            //console.log('Attempted Tests:', this.attemptedTests);
            this.tests = this.tests.filter(test => !this.attemptedTests.has(test._id)); // Only show unattempted tests
            //console.log('Filtered Tests:', this.tests);
          },
          error: (err) => {
            console.error('Failed to fetch user reports', err);
            this.errorMessage = 'Could not fetch reports';
          }
        });
      },
      error: (err) => {
        console.error('Failed to load tests', err);
        this.errorMessage = 'Could not fetch tests';
      }
    });
  }

  startTest(testId: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: 'Are you sure you want to start the test?' },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.router.navigate(['/user/tests', testId]);
      }
    });
  }
}


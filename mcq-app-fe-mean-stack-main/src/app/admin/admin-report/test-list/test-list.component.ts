import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReportService } from '../../../report.service';

@Component({
  selector: 'app-test-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test-list.component.html',
  styleUrls:['./test-list.component.css']
})
export class TestListComponent implements OnInit {
  tests: any[] = [];

  constructor(private reportService: ReportService, private router: Router) {}

  ngOnInit(): void {
    this.reportService.getTestsWithReports().subscribe({
      next: data => this.tests = data,
      error: err => console.error('Failed to load tests', err)
    });
  }

  viewReports(testId: string): void {
    this.router.navigate(['/admin/admin-report/test', testId]);
  }
}

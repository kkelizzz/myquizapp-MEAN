import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TestService } from './test.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test-management.component.html',
  styleUrls: ['./test-management.css']
})
export class TestManagementComponent implements OnInit {
  tests: any[] = [];

  constructor(private testService: TestService, private router: Router) {}

  ngOnInit() {
    this.loadTests();
  }

  loadTests() {
    this.testService.getTests().subscribe((data) => {
      this.tests = data;
    });
  }

  addTest() {
    this.router.navigate(['/admin/test-management/add']);
  }

  editTest(id: string) {
    this.router.navigate(['/admin/test-management/edit', id]);
  }

  deleteTest(id: string) {
    if (confirm('Are you sure you want to delete this test?')) {
      this.testService.deleteTest(id).subscribe(() => this.loadTests());
    }
  }

  goToQuestionManagement(testId: string) {
    this.router.navigate(['/admin/test-management', testId, 'questions']);
  }

  copyLink(testId: string) {
    const testLink = `${window.location.origin}/user/tests/${testId}`;
    navigator.clipboard.writeText(testLink).then(() => {
      alert('Test link copied!');
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  }
  
}

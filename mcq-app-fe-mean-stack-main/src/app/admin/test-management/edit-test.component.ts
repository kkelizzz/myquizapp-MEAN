import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestService } from './test.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-test',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2>Edit Test</h2>
      <form *ngIf="test" (ngSubmit)="updateTest()">
        <div class="form-group">
          <label for="name">Test Name</label>
          <input type="text" class="form-control" id="name" [(ngModel)]="test.name" name="name" required>
        </div>
        <div class="form-group">
          <label for="timeLimit">Time Limit (minutes)</label>
          <input type="number" class="form-control" id="timeLimit" [(ngModel)]="test.timeLimit" name="timeLimit" required>
        </div>
        <div class="form-group">
          <label for="date">Test Date</label>
          <input type="date" class="form-control" id="date" [(ngModel)]="test.date" name="date" required>
        </div>
        <button type="submit" class="btn btn-primary">Update Test</button>
      </form>
    </div>
  `,
  styleUrl: './edit-test.component.css',
})
export class EditTestComponent implements OnInit {
  testId!: string;
  test: any = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private testService: TestService
  ) {}

  ngOnInit(): void {
    this.testId = this.route.snapshot.paramMap.get('id')!;
    this.testService.getTestById(this.testId).subscribe((data) => {
      this.test = data;
    });
  }

  updateTest() {
    this.testService.updateTest(this.testId, this.test).subscribe(() => {
      this.router.navigate(['/admin/test-management']);
    });
  }
}

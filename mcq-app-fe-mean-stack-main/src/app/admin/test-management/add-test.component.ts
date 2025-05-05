import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TestService } from './test.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-test',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls:['./add-test.component.css'],
  template: `
    <div class="container">
      <h2>Add New Test</h2>
      <form (ngSubmit)="addTest()">
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
        <button type="submit" class="btn btn-success">Add Test</button>
      </form>
    </div>
  `,
  styles: [`.container { max-width: 500px; margin: auto; }`]
})
export class AddTestComponent {
  test = { name: '', timeLimit: 0, date: '' };

  constructor(private testService: TestService, private router: Router) {}

  addTest() {
    this.testService.addTest(this.test).subscribe(() => {
      this.router.navigate(['/admin/test-management']);
    });
  }
}

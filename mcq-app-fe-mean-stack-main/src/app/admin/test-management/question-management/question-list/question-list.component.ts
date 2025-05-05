import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-question-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './question-list.component.html',
  styleUrl: './question-list.component.css'
})
export class QuestionListComponent implements OnInit {
  testId!: string;
  questionId!: string;
  questions: any[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.testId = this.route.snapshot.paramMap.get('testId')!;
    this.loadQuestions();
  }

  loadQuestions(): void {
    this.http.get<any[]>(`http://localhost:5000/api/questions/test/${this.testId}`)
      .subscribe(data => this.questions = data);
  }

  addQuestion(): void {
    this.router.navigate(['/admin/test-management', this.testId, 'questions', 'add']); // ✅ works

  }

  editQuestion(id: string): void {
    this.router.navigate(['/admin/test-management', this.testId, 'questions', 'edit', id]);
  }
  

  deleteQuestion(id: string): void {
    if (confirm('Are you sure you want to delete this question?')) {
      this.http.delete(`http://localhost:5000/api/questions/${id}`)
        .subscribe(() => this.loadQuestions());
    }
  }
}

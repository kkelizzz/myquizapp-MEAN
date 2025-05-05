import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-edit-question',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-question.component.html',
  styleUrls:['./edit-question.component.css']
})
export class EditQuestionComponent implements OnInit {
  testId!: string;
  questionId!: string;
  question = {
    questionText: '',
    options: ['', '', '', ''],
    correctAnswer: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private questionService: QuestionService
  ) {}

  isLoaded = false;

  ngOnInit(): void {
    this.testId = this.route.snapshot.paramMap.get('testId') || '';
    this.questionId = this.route.snapshot.paramMap.get('questionId') || '';

    this.questionService.getQuestionById(this.questionId).subscribe({
        next: (data: any) => {
            console.log('Loaded question:', data);
            this.question = {
              questionText: data.questionText || '',
              options: Array.isArray(data.options) && data.options.length === 4
                ? data.options
                : ['', '', '', ''],
              correctAnswer: data.correctAnswer || ''
            };
            this.isLoaded = true;
          }
          ,
      error: err => console.error('Failed to load question:', err)
    });
  }

  updateQuestion(): void {
    if (
      this.question.questionText &&
      this.question.options.every(opt => opt) &&
      this.question.correctAnswer
    ) {
      this.questionService.updateQuestion(this.questionId, this.question).subscribe({
        next: () => {
          this.router.navigate(['/admin/test-management', this.testId, 'questions']);
        },
        error: err => console.error('Update failed:', err)
      });
    } else {
      alert('Please fill in all fields.');
    }
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }
}


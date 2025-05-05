// src/app/admin/test-management/question-management/add-question.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-add-question',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-question.component.html',
  styleUrls:['./add-question.component.css']
})
export class AddQuestionComponent {
  testId!: string;
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


  ngOnInit() {
    this.testId = this.route.snapshot.paramMap.get('testId') || '';
    console.log('Test ID:', this.testId); // Add this
  }
  

  addQuestion(): void {
  if (
    this.question.questionText &&
    this.question.options.every(opt => opt) &&
    this.question.correctAnswer &&
    this.testId
  ) {
    const newQuestion = {
      questionText: this.question.questionText,
      options: this.question.options,
      correctAnswer: this.question.correctAnswer,
      testId: this.testId
    };

    console.log('Sending to backend:', newQuestion);

    this.questionService.addQuestion(newQuestion).subscribe({
      next: () => this.router.navigate(['/admin/test-management', this.testId, 'questions']),
      error: err => console.error('Add failed:', err)
    });
  } else {
    alert('Please fill in all fields.');
  }
}

  

  trackByIndex(index: number, obj: any): any {
    return index;
  }
  
}

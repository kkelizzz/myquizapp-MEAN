// // take-test.component.ts
// // import { Component, OnInit } from '@angular/core';
// // import { ActivatedRoute, Router } from '@angular/router';
// // import { CommonModule } from '@angular/common';
// // import { FormsModule } from '@angular/forms';
// // import { QuestionService } from '../../../admin/test-management/question-management/question.service'
// // import { ReportService } from '../../../report.service';

// // @Component({
// //   selector: 'app-take-test',
// //   standalone: true,
// //   imports: [CommonModule, FormsModule],
// //   templateUrl: './take-test.component.html',
// // })
// // export class TakeTestComponent implements OnInit {
// //   testId = '';
// //   questions: any[] = [];
// //   answers: { [questionId: string]: string } = {};

// //   constructor(
// //     private route: ActivatedRoute,
// //     private questionService: QuestionService,
// //     private reportService: ReportService,
// //     private router: Router
// //   ) {}

// //   ngOnInit(): void {
// //     this.testId = this.route.snapshot.paramMap.get('testId') || '';
// //     this.loadQuestions();
// //   }

// //   loadQuestions() {
// //     this.questionService.getQuestions(this.testId).subscribe((data: any[]) => {
// //       this.questions = data;
// //     });
// //   }

// //   submit() {
// //     const userId = localStorage.getItem('userId');
  
// //     const payload = {
// //       userId,
// //       testId: this.testId,
// //       answers: this.answers
// //     };
  
// //     this.reportService.submitTest(payload).subscribe(() => {
// //       alert('Test submitted!');
// //       this.router.navigate(['/user/user-test']);
// //     });
// //   }

// //   getOptionKeys(options: any): string[] {
// //     return Object.keys(options);
// //   }
  
// //   getOptionLetter(index: number): string {
// //     return String.fromCharCode(65 + index); // 65 = 'A', 66 = 'B', etc.
// //   }
  
// // }


// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { QuestionService } from '../../../admin/test-management/question-management/question.service';
// import { ReportService } from '../../../report.service';
// import { TestService } from '../../../admin/test-management/test.service';
// import { interval, Subscription } from 'rxjs';

// @Component({
//   selector: 'app-take-test',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './take-test.component.html',
// })
// export class TakeTestComponent implements OnInit, OnDestroy {
//   testId = '';
//   questions: any[] = [];
//   answers: { [questionId: string]: string } = {};
//   timeLeft: number = 0;
//   timerSubscription: Subscription | null = null;

//   constructor(
//     private route: ActivatedRoute,
//     private questionService: QuestionService,
//     private reportService: ReportService,
//     private testService: TestService,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     this.testId = this.route.snapshot.paramMap.get('testId') || '';
//     this.loadTest();
//     this.loadQuestions();
//   }

//   ngOnDestroy(): void {
//     if (this.timerSubscription) {
//       this.timerSubscription.unsubscribe();
//     }
//   }

//   loadTest() {
//     this.testService.getTestById(this.testId).subscribe(test => {
//       if (test.timeLimit) {
//         this.timeLeft = test.timeLimit * 60; // in seconds
//         this.startTimer();
//       }
//     });
//   }

//   loadQuestions() {
//     this.questionService.getQuestions(this.testId).subscribe((data: any[]) => {
//       this.questions = data;
//     });
//   }

//   startTimer() {
//     this.timerSubscription = interval(1000).subscribe(() => {
//       if (this.timeLeft > 0) {
//         this.timeLeft--;
//       } else {
//         this.submit(true);
//       }
//     });
//   }

//   formatTime(seconds: number): string {
//     const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
//     const secs = (seconds % 60).toString().padStart(2, '0');
//     return `${mins}:${secs}`;
//   }

//   submit(auto = false) {
//     const userId = localStorage.getItem('userId');
//     if (!userId) return;

//     const payload = {
//       userId,
//       testId: this.testId,
//       answers: this.answers,
//     };

//     if (this.timerSubscription) {
//       this.timerSubscription.unsubscribe();
//     }

//     this.reportService.submitTest(payload).subscribe(() => {
//       if (auto) {
//         alert('Time is up! Test auto-submitted.');
//       } else {
//         alert('Test submitted!');
//       }
//       //this.router.navigate(['/user/user-test']);
//       this.router.navigate(['/user'], { replaceUrl: true }).then(() => {
//         // Then navigate to the test list page
//         this.router.navigate(['/user/user-test']);
//       });
//     });
//   }

//   getOptionLetter(index: number): string {
//     return String.fromCharCode(65 + index);
//   }
// }
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuestionService } from '../../../admin/test-management/question-management/question.service';
import { ReportService } from '../../../report.service';
import { TestService } from '../../../admin/test-management/test.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-take-test',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './take-test.component.html',
  styleUrls:['./take-test.component.css']
})
export class TakeTestComponent implements OnInit, OnDestroy {
  testId = '';
  questions: any[] = [];
  answers: { [questionId: string]: string } = {};
  timeLeft: number = 0;
  totalTime: number = 0;
  currentQuestionIndex: number = 0; // Track the current question for progress bar
  timerSubscription: Subscription | null = null;

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private reportService: ReportService,
    private testService: TestService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.testId = this.route.snapshot.paramMap.get('testId') || '';
    this.loadTest();
    this.loadQuestions();
  }

  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  loadTest() {
    this.testService.getTestById(this.testId).subscribe(test => {
      if (test.timeLimit) {
        this.timeLeft = test.timeLimit * 60; // in seconds
        this.totalTime = this.timeLeft; // store total time for progress calculation
        this.startTimer();
      }
    });
  }

  loadQuestions() {
    this.questionService.getQuestions(this.testId).subscribe((data: any[]) => {
      this.questions = data;
    });
  }

  startTimer() {
    this.timerSubscription = interval(1000).subscribe(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.submit(true);
      }
    });
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  }

  submit(auto = false) {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    const payload = {
      userId,
      testId: this.testId,
      answers: this.answers,
    };

    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }

    this.reportService.submitTest(payload).subscribe(() => {
      if (auto) {
        alert('Time is up! Test auto-submitted.');
      } else {
        alert('Test submitted!');
      }
      this.router.navigate(['/user'], { replaceUrl: true }).then(() => {
        // Then navigate to the test list page
        this.router.navigate(['/user/user-test']);
      });
    });
  }

  // Get Option Letters (e.g. A, B, C, etc.)
  getOptionLetter(index: number): string {
    return String.fromCharCode(65 + index);
  }

  // Method to calculate time progress percentage
  getTimeProgress(): number {
    return (this.timeLeft / this.totalTime) * 100;
  }

  // Method to calculate question progress percentage
  getQuestionProgress(): number {
    return (this.currentQuestionIndex / this.questions.length) * 100;
  }

  // Method to track question changes (optional)
  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    }
  }

  prevQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }
}

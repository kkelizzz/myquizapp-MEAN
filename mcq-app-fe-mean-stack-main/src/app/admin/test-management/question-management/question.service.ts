import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class QuestionService {
  private baseUrl = 'http://localhost:5000/api/questions';

  constructor(private http: HttpClient) {}
  
  addQuestion(question: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, question, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  getQuestionById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  updateQuestion(id: string, updatedData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, updatedData);
  }
  
  getQuestions(testId: string) {
    return this.http.get<any[]>(`${this.baseUrl}/test/${testId}`);
  }
  
}
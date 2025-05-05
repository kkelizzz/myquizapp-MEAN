import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReportService {
  private baseUrl = 'http://localhost:5000/api/reports';

  constructor(private http: HttpClient) {}

  getTestsWithReports(): Observable<any> {
    return this.http.get(`${this.baseUrl}/tests`);
  }

  getReportsByTest(testId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/test/${testId}`);
  }

  getUserRank(testId: string, userId: string) {
    return this.http.get<{ rank: number }>(`${this.baseUrl}/rank/${testId}/${userId}`);
  }

  submitTest(payload: any) {
    return this.http.post(`${this.baseUrl}/submit`, payload);
  }

  getUserReports(userId: string): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/${userId}`);
  }

  deleteReport(_id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/delete/${_id}`);
  }
  
}


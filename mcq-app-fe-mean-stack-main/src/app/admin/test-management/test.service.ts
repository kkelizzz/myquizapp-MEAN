import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TestService {
  private baseUrl = 'http://localhost:5000/api/tests';

  constructor(private http: HttpClient) {}

  getTests(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getTestById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  addTest(test: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, test);
  }

  updateTest(id: string, test: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, test);
  }

  deleteTest(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
  
  
  
}

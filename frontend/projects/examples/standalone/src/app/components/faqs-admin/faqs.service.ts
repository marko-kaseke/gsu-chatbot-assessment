import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Faqs {
  id: number;
  category: string;
  question: string;
  answer: string;
  keywords: string;
}

@Injectable({
  providedIn: 'root'
})
export class FaqsService {
  //private apiUrl = 'http://localhost:8081/api/faqs';  // backend endpoint for fetching faqs   //local dev only
  //private deleteApiUrl = 'http://localhost:8081/api/admin/faqs';  // API endpoint for deleting FAQ  //local dev only
  
  private apiUrl = 'http://10.45.9.126:8081/api/faqs'; ////for docker/network stable
  private deleteApiUrl = 'http://10.45.9.126:8081/api/admin/faqs'; ////for docker/network stable

  constructor(private http: HttpClient) {}

  getFaqs(): Observable<Faqs[]> {
    return this.http.get<Faqs[]>(this.apiUrl);
  }

  // Method to delete a FAQ by ID
  deleteFaq(id: number): Observable<void> {
    return this.http.delete<void>(`${this.deleteApiUrl}/${id}`);
  }
}
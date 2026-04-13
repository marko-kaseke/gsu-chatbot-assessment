import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Faq {
  category: string;
  question: string;
  answer: string;
  keywords: string[];
}

@Injectable({
  providedIn: 'root',
})
export class CreateFaqService {
  //private apiUrl = 'http://localhost:8081/api/admin/faqs'; // API endpoint for creating FAQ //local dev only
  private apiUrl = 'http://10.45.9.126:8081/api/admin/faqs'; ////for docker/network stable

  constructor(private httpClient: HttpClient) {}

  // Method to send the FAQ data to the backend
  createFaq(faq: Faq): Observable<Faq> {
    return this.httpClient.post<Faq>(this.apiUrl, faq);
  }
}
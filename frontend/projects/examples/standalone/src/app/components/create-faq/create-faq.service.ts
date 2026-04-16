import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

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
  private readonly apiUrl = `${environment.api.baseUrl}/admin/faqs`;  // API endpoint for creating FAQ

  constructor(private httpClient: HttpClient) {}

  // Method to send the FAQ data to the backend
  createFaq(faq: Faq): Observable<Faq> {
    return this.httpClient.post<Faq>(this.apiUrl, faq);
  }
}
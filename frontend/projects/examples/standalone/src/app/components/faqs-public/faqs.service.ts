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
  private apiUrl = 'http://10.45.9.126:8081/api/faqs'; ////for docker/network stable

  constructor(private http: HttpClient) {}

  getFaqs(): Observable<Faqs[]> {
    return this.http.get<Faqs[]>(this.apiUrl);
  }

}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

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
  private readonly apiUrl = `${environment.api.baseUrl}/faqs`;  // backend endpoint for fetching faqs
  private readonly deleteApiUrl = `${environment.api.baseUrl}/admin/faqs`;  // API endpoint for deleting FAQ

  constructor(private http: HttpClient) {}

  getFaqs(): Observable<Faqs[]> {
    return this.http.get<Faqs[]>(this.apiUrl);
  }

  // Method to delete a FAQ by ID
  deleteFaq(id: number): Observable<void> {
    return this.http.delete<void>(`${this.deleteApiUrl}/${id}`);
  }
}
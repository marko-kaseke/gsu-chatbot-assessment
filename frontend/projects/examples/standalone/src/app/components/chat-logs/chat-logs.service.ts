import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ChatLogs {
  id: number;
  sessionId: number;
  message: string;
  response: string;
  timestamp: string;
  version: number;
}

@Injectable({
  providedIn: 'root'
})
export class ChatLogsService {
  private readonly apiUrl = `${environment.api.baseUrl}/admin/chat-logs`;  // backend endpoint for fetching chat logs

  constructor(private http: HttpClient) {}

  getChatLogs(): Observable<ChatLogs[]> {
    return this.http.get<ChatLogs[]>(this.apiUrl);
  }
}
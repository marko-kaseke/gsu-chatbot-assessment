import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  //private apiUrl = 'http://localhost:8081/api/admin/chat-logs';  // backend endpoint for fetching chat logs //local dev only
  private apiUrl = 'http://10.45.9.126:8081/api/admin/chat-logs'; ////for docker/network stable

  constructor(private http: HttpClient) {}

  getChatLogs(): Observable<ChatLogs[]> {
    return this.http.get<ChatLogs[]>(this.apiUrl);
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

// Define the structure of a chat message
export interface ChatMessage {
  sender: 'user' | 'bot'; // 'user' or 'bot'
  text: string;            // Message text
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private readonly apiUrl = `${environment.api.baseUrl}/chat`;  // API URL for backend communication
  
  constructor(private http: HttpClient) {}


  //Sends a user's message to the backend and receives a bot response.
  getResponse(userMessage: string): Observable<ChatMessage> {
    // Construct the request payload (DTO)
    const chatDto = {
      message: userMessage,
      sessionId: 1 // Example session ID, can be dynamic based on the session
    };

    // Send HTTP POST request to backend and map the response to the required format
    return this.http.post<{ response: string }>(this.apiUrl, chatDto).pipe(
      map(dto => ({
        sender: 'bot', // Static as the response is always from the bot
        text: dto.response // Response from the backend mapped to 'text'
      }))
    );
  }
}
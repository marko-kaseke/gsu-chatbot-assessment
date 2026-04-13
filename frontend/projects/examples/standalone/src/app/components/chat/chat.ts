import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { ChatService, ChatMessage } from './chat.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,        // For structural directives like *ngFor
    ReactiveFormsModule  // For reactive form controls
  ],
  templateUrl: './chat.html',
  styleUrls: ['./chat.css']
})
export class ChatComponent {
  private fb = inject(FormBuilder);
  private chatService = inject(ChatService);

  // Reactive form to capture user input
  form = this.fb.group({
    userMessage: ['', Validators.required]
  });

  messages: ChatMessage[] = [];
  isSending = false;

  sendMessage() {
    if (this.form.invalid) return;

    const text = this.form.value.userMessage.trim();
    if (!text) return;

    // Add user's message to the chat
    this.messages.push({ sender: 'user', text });
    this.form.reset();
    this.isSending = true;

    // Fetch the bot's response via the service
    this.chatService.getResponse(text).subscribe(resp => {
      this.messages.push(resp);
      this.isSending = false;
      this.scrollToBottom();
    });
  }

  // Scroll to the bottom of the chat container
  scrollToBottom() {
    setTimeout(() => {
      const container = document.querySelector('.chat-messages');
      if (container) container.scrollTop = container.scrollHeight;
    }, 100);
  }
}
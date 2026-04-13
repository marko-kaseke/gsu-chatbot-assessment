import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatLogsService, ChatLogs } from './chat-logs.service';

@Component({
  selector: 'app-chat-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-logs.html',
  styleUrls: ['./chat-logs.css']
})
export class ChatLogsComponent implements OnInit {
  private chatLogsService = inject(ChatLogsService);
  chatLogs: ChatLogs[] = [];
  displayedColumns: string[] = ['id', 'sessionId', 'message', 'response', 'timestamp']; 
  isLoading = true;
  errorMessage: string | null = null;

  // Pagination variables
  pageSize: number = 5; // Number of items per page
  currentPage: number = 0; // Current page index
  totalPages: number = 0; // Total pages available

  ngOnInit(): void {
    this.chatLogsService.getChatLogs().subscribe(
      (data) => {
        this.chatLogs = data;
        this.totalPages = Math.ceil(this.chatLogs.length / this.pageSize); // Calculate total pages
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching chat logs:', error);		
        if (error.status === 401) {
          this.errorMessage = 'You are not authenticated. Please log in to continue.';
        } else {
          this.errorMessage = 'Error loading chat logs. Please try again later.';
        }
        this.isLoading = false;
      }
    );
  }

  // Paginate the chat logs
  get pagedChatLogs() {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    return this.chatLogs.slice(start, end);
  }

  // Navigate to the next page
  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
    }
  }

  // Navigate to the previous page
  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }
}
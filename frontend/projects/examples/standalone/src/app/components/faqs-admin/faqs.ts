import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';  // Import RouterModule and Router
import { FaqsService, Faqs } from './faqs.service';

@Component({
  selector: 'app-faqs',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './faqs.html',
  styleUrls: ['./faqs.css']
})
export class FaqsAdminComponent implements OnInit {
  private faqsService = inject(FaqsService);
  private router = inject(Router);  // Inject Router for navigation
  faqs: Faqs[] = [];
  displayedColumns: string[] = ['id', 'category', 'question', 'answer', 'keywords'];
  isLoading = true;
  errorMessage: string | null = null;

  // Pagination variables
  pageSize: number = 5;
  currentPage: number = 0;
  totalPages: number = 0;

  ngOnInit(): void {
    this.loadFaqs();
  }

  // Fetch the FAQs from the backend
  loadFaqs(): void {
    this.faqsService.getFaqs().subscribe(
      (data) => {
        this.faqs = data;
        this.totalPages = Math.ceil(this.faqs.length / this.pageSize); // Calculate total pages
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching FAQs:', error);
        this.errorMessage = 'Error loading FAQs. Please try again later.';
        this.isLoading = false;
      }
    );
  }

  // Delete FAQ method
  deleteFAQ(id: number): void {
    const confirmation = window.confirm("Are you sure you want to delete this FAQ?");
    if (confirmation) {
      this.faqsService.deleteFaq(id).subscribe(
        () => {
          // Refetch FAQs after successful deletion
          this.loadFaqs();
          alert('FAQ deleted successfully!');
          // Redirect the user to the FAQs page after deletion
          this.router.navigate(['/faqs']);  // Navigate back to FAQ list
        },
        (error) => {
          console.error('Error deleting FAQ:', error);
          // No alert here, just log the error
        }
      );
    }
  }

  // Paginate the faqs
  get pagedFaqs() {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    return this.faqs.slice(start, end);
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
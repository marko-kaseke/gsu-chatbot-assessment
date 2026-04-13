import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateFaqService, Faq } from './create-faq.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-create-faq',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-faq.html',
  styleUrls: ['./create-faq.css'],
})
export class CreateFaqComponent implements OnInit {
  constructor(private createFaqService: CreateFaqService) {}

  // Define the model for new FAQ
  newFaq: Faq = {
    category: '',
    question: '',
    answer: '',
    keywords: [],
  };

  // Observable to show feedback after submitting FAQ
  response$: Observable<Faq | null> = of(null);

  ngOnInit(): void {
    // Any necessary initialization
  }

  // Handle form submission
  onSubmit() {
    if (this.isValid()) {
      this.createFaqService.createFaq(this.newFaq).subscribe(
        (response) => {
          this.response$ = of(response);
          alert('FAQ created successfully!');
          this.resetForm();
        },
        (error) => {
          console.error('Error creating FAQ', error);
          alert('Error creating FAQ. Please try again.');
        }
      );
    } else {
      alert('Please fill in all fields.');
    }
  }

  // Validate the form inputs
  isValid(): boolean {
    return (
      this.newFaq.category.trim() &&
      this.newFaq.question.trim() &&
      this.newFaq.answer.trim() &&
      this.newFaq.keywords.length > 0
    );
  }

  // Reset the form after submission
  resetForm() {
    this.newFaq = {
      category: '',
      question: '',
      answer: '',
      keywords: [],
    };
  }

  // Method to handle the split and trim keywords
  onKeywordsChange(keywordsInput: string) {
    this.newFaq.keywords = keywordsInput.split(',').map(keyword => keyword.trim());
  }
}
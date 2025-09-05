import { Component } from '@angular/core';
import { IFaq } from '../../core/models/faqs.model';
import { FaqsService } from '../../core/services/layout-services/FAQs/faqs-service';

@Component({
  selector: 'app-faqs',
  imports: [],
  templateUrl: './faqs.html',
  styleUrl: './faqs.css'
})
export class FAQs {
  faqs: IFaq[] = [];
  isLoading = true;

  constructor(private faqService:FaqsService) {}

  ngOnInit(): void {
    this.faqService.getPublicFaqs().subscribe({
      next: (res) => {
        this.faqs = res.data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }
}

import { Component } from '@angular/core';
import { FaqsDashboardService } from '../../core/services/dashboard-services/FAQs/faqs-dashboard-service';
import { IFaq } from '../../core/models/faqs.model';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-faq',
  imports: [RouterLink,RouterOutlet],
  templateUrl: './faq.html',
  styleUrl: './faq.css'
})
export class Faq {
    faqs: IFaq[] = [];
  isLoading = true;

  constructor(private _faqService: FaqsDashboardService) {}

  ngOnInit(): void {
    this.loadFaqs();
  }

  loadFaqs() {
    this._faqService.getAllFaqs().subscribe({
      next: (res) => {
        this.faqs = res.data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  toggleFlag(id: string, field: 'isActive' | 'isDeleted') {
    this._faqService.toggleFlag(id, field).subscribe(() => this.loadFaqs());
  }

}

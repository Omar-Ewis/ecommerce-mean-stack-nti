import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FaqsDashboardService } from '../../../core/services/dashboard-services/FAQs/faqs-dashboard-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-faq',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-faq.html',
  styleUrl: './add-faq.css'
})
export class AddFaq {
  faqForm: FormGroup;

  constructor(private _fb: FormBuilder, private _faqService:FaqsDashboardService, private _router: Router) {
    this.faqForm = this._fb.group({
      question: ['', [Validators.required, Validators.minLength(5)]],
      answer: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  submitFaq() {
    if (this.faqForm.invalid) return;

    this._faqService.addFaq(this.faqForm.value).subscribe({
      next: () => {
        alert('FAQ added successfully!');
        this._router.navigate(['/dashboard/faq']);
      },
      error: (err) => {
        alert('Failed to add FAQ.');
        console.error(err);
      }
    });
  }
}

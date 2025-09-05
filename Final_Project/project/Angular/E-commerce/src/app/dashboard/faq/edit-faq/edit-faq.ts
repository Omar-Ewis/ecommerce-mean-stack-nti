import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FaqsDashboardService } from '../../../core/services/dashboard-services/FAQs/faqs-dashboard-service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-faq',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './edit-faq.html',
  styleUrl: './edit-faq.css'
})
export class EditFaq {
  faqForm: FormGroup;
  faqId: string = '';
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private _faqService: FaqsDashboardService,
    private _fb: FormBuilder,
    private _router: Router
  ) {
    this.faqForm = this._fb.group({
      question: ['', [Validators.required, Validators.minLength(5)]],
      answer: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  ngOnInit(): void {
    this.faqId = this.route.snapshot.params['id'];

    this._faqService.getAllFaqs().subscribe({
      next: (res) => {
        const faq = res.data.find(f => f._id === this.faqId);
        if (faq) {
          this.faqForm.patchValue({
            question: faq.question,
            answer: faq.answer
          });
        }
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  updateFaq() {
    if (this.faqForm.invalid) return;

    this._faqService.updateFaq(this.faqId, this.faqForm.value).subscribe({
      next: () => {
        alert('FAQ updated successfully!');
        this._router.navigate(['/dashboard/faq']);
      },
      error: (err) => {
        alert('Update failed!');
        console.error(err);
      }
    });
  }
}

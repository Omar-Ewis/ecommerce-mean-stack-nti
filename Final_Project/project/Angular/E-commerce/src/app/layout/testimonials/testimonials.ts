import { Component } from '@angular/core';
import { ITestimonial } from '../../core/models/testimonials.model';
import { TestimonialService } from '../../core/services/layout-services/Testimonials/testimonial-service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-testimonials',
  imports: [ReactiveFormsModule],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.css'
})
export class Testimonials {
  testimonials: ITestimonial[] = [];
  isLoading = true;
  form: FormGroup;

  constructor(private testimonialService: TestimonialService, private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  ngOnInit(): void {
    this.testimonialService.getPublicTestimonials().subscribe({
      next: (res) => {
        this.testimonials = res.data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  submit() {
    if (this.form.invalid) return;

    this.testimonialService.addTestimonial(this.form.value).subscribe({
      next: () => {
        alert('Thank you for your feedback! It will be reviewed soon.');
        this.form.reset();
      },
      error: () => {
        alert('Something went wrong. Please try again later.');
      }
    });
  }
  
}

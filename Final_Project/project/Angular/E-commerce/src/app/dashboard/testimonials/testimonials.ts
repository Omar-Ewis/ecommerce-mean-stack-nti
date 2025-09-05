import { Component } from '@angular/core';
import { TestimonialsService } from '../../core/services/dashboard-services/Testimonials/testimonials-service';
import { ITestimonial } from '../../core/models/testimonials.model';
@Component({
  selector: 'app-testimonials',
  imports: [],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.css'
})
export class Testimonials {
  testimonials: ITestimonial[] = [];
  isLoading = true;
  constructor(private testimonialService: TestimonialsService) {}
  ngOnInit(): void {
    this.testimonialService.getAll().subscribe({
      next: (res) => {
        this.testimonials = res.data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }
  toggleFlag(id: string, field: 'isActive' | 'isDeleted') {
    this.testimonialService.toggleFlag(id, field).subscribe({
      next: (res) => {
        const t = this.testimonials.find(t => t._id === id);
        if (t) t[field] = !t[field];
      }
    });
  }
}

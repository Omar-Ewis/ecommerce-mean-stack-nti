import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoryDashboardService } from '../../../core/services/dashboard-services/Category/category-dashboard-service';
import { ICategory } from '../../../core/models/category.model';
import { ProductDashboardSercvice } from '../../../core/services/dashboard-services/Product/product-dashboard-sercvice';

@Component({
  selector: 'app-create-product',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './create-product.html',
  styleUrl: './create-product.css'
})
export class CreateProduct {
  imageFile: File | null = null;
  categories: ICategory[] = [];

  constructor(private productService: ProductDashboardSercvice,private categoryService: CategoryDashboardService,private router: Router) {}
  ngOnInit(): void {
    this.loadCategories();
  }
  loadCategories() {
    this.categoryService.getCategoryTreeForAdmin().subscribe({
      next: (res) => {
        this.categories = res.data;
      },
      error: (err) => console.error('Failed to load categories', err)
    });
  }

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
    price: new FormControl(0, Validators.required),
    quantity: new FormControl(0, Validators.required),
    categoryId: new FormControl('', Validators.required),
    image: new FormControl<File | null>(null, Validators.required)
  });

onFileChange(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    this.imageFile = input.files[0];
    this.form.get('image')?.setValue(this.imageFile);
  }
}

  onSubmit() {
    if (this.form.invalid || !this.imageFile) return;

    const formData = new FormData();
    Object.entries(this.form.value).forEach(([key, value]) => {
      if (key !== 'image') formData.append(key, value as string);
    });
    formData.append('image', this.imageFile);

    this.productService.createProduct(formData).subscribe({
      next: () => this.router.navigate(['/dashboard/products']),
      error: err => console.error('Create failed', err)
    });
  }
}

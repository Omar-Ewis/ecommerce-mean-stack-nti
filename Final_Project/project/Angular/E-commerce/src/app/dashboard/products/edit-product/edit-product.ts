import { Component } from '@angular/core';
import { IProduct } from '../../../core/models/product.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductDashboardSercvice } from '../../../core/services/dashboard-services/Product/product-dashboard-sercvice';

@Component({
  selector: 'app-edit-product',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './edit-product.html',
  styleUrl: './edit-product.css'
})
export class EditProduct {
  form!: FormGroup;
  productId!: string;
  productSlug!: string;
  isSubmitting = false;
  currentImageURL: string | null = null;
  selectedImage: File | null = null;
  constructor(
    private fb: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router,
    private _productService: ProductDashboardSercvice
  ) {}

  ngOnInit(): void {
    this.productSlug = this._route.snapshot.params['slug'];
    this.loadProduct();
  }

  loadProduct() {
    this._productService.getProductBySlug(this.productSlug).subscribe({
      next: (product: IProduct) => {
        this.productId = product._id;
        this.currentImageURL = product.imageURL;

        this.form = this.fb.group({
          name: [product.name, Validators.required],
          description: [product.description],
          price: [product.price, [Validators.required, Validators.min(0)]],
          quantity: [product.quantity, [Validators.required, Validators.min(0)]],
          categoryId: [product.categoryId?._id || product.categoryId, Validators.required],
          image: [null]
        });
      },
      error: () => alert('Product not found')
    });
  }

  onImageSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.isSubmitting = true;
    const formData = new FormData();
    for (const key in this.form.value) {
      if (key !== 'image') {
        formData.append(key, this.form.value[key]);
      }
    }
    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }
    this._productService.updateProduct(this.productId, formData).subscribe({
      next: () => {
        this.isSubmitting = false;
        this._router.navigate(['/dashboard/products']);
      },
      error: () => {
        this.isSubmitting = false;
        alert('Failed to update product');
      }
    });
  }
}

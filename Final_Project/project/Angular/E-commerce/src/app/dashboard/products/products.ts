import { Component } from '@angular/core';
import { IProduct } from '../../core/models/product.model';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { routes } from '../../app.routes';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ProductDashboardSercvice } from '../../core/services/dashboard-services/Product/product-dashboard-sercvice';

@Component({
  selector: 'app-products',
  imports: [CommonModule,RouterLink,RouterOutlet],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products {
  products: IProduct[] = [];
  adminCategoryTree: any[] = [];
  totalPages: number = 0;
  currentPage: number = 1;
  isLoading = true;
  staticURL = environment.uploadsURL;
  constructor(private _productService: ProductDashboardSercvice) {}
  ngOnInit(): void {
    this.getAllProducts();
  }
  getAllProducts(page: number = 1) {
  this.isLoading = true;
  this._productService.getAllProducts({ page }).subscribe({
    next: (res) => {
      this.products = res.data;
      this.totalPages = res.pages;
      this.currentPage = res.currentPage;
      this.isLoading = false;
    },
    error: () => this.isLoading = false
  });
}
  toggleActive(product: IProduct) {
  const newStatus = !product.isActive;
  this._productService.updateFlags(product._id, { isActive: newStatus }).subscribe({
    next: () => product.isActive = newStatus,
    error: () => alert('Failed to toggle status')
  });
}

deleteProduct(product: IProduct) {
  if (!confirm('Are you sure you want to delete this product?')) return;
  this._productService.updateFlags(product._id, { isDeleted: true }).subscribe({
    next: () => {
      this.products = this.products.filter(p => p._id !== product._id);
    },
    error: () => alert('Failed to delete product')
  });
}

}

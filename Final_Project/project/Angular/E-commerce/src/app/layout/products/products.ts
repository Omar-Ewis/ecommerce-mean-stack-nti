import { Component } from '@angular/core';
import { ProductService } from '../../core/services/layout-services/Products/product-service';
import { IProduct } from '../../core/models/product.model';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CartService } from '../../core/services/layout-services/Cart/cart-service';
@Component({
  selector: 'app-products',
  imports: [CommonModule,RouterLink],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products {
  products!:IProduct[];
  isLoading = true;
  staticURL=environment.uploadsURL;
  constructor(private _productService:ProductService,private _route:ActivatedRoute,private _cartService: CartService,private route:Router){}
  ngOnInit(): void {
    this._route.queryParamMap.subscribe(params => {
      const categorySlug = params.get('category');
      const page = +(params.get('page') || 1);
      this.currentPage = page;
      this.isLoading = true;
      if (categorySlug) {
        this._productService.getProductsByCategorySlug(categorySlug).subscribe({
          next: (products) => {
            this.products = products;
            this.isLoading = false;
          },
          error: () => {
            this.isLoading = false;
          }
        });
      } else {
        this._productService.getAllProducts(page).subscribe({
          next: (products) => {
            this.products = products;
            this.isLoading = false;
          },
          error: () => {
            this.isLoading = false;
          }
        });
      }
    });
  }

  addToCart(productId: string) {
  this._cartService.addToCart(productId).subscribe({
    error: () => {
      this.route.navigate(['/login'])
    }
  });
  }

  currentPage: number = 1;
  goToPage(page: number) {
    if (page < 1) return;
    this.route.navigate([], {
      relativeTo: this._route,
      queryParams: { page },
      queryParamsHandling: 'merge'
    });
  }
}


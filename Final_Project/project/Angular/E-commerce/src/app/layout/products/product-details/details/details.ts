import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../core/services/layout-services/Products/product-service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IProduct } from '../../../../core/models/product.model';
import { environment } from '../../../../../environments/environment';
import { CartService } from '../../../../core/services/layout-services/Cart/cart-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './details.html',
  styleUrl: './details.css'
})
export class Details implements OnInit {
  constructor(private _productService:ProductService,private _activatedRoute:ActivatedRoute,private _cartService:CartService){}
  product!: IProduct;
  isLoading = true;
  staticURL = environment.uploadsURL + '/';
  ngOnInit(): void {
    const slug = this._activatedRoute.snapshot.paramMap.get('slug');
    if (slug) {
      this._productService.getProductBySlug(slug).subscribe({
        next: (data) => {
          this.product = data;
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        }
      });
    }
  }
quantity: number = 1;

increaseQty() {
  if (this.quantity < this.product.quantity) {
    this.quantity++;
  }
}

decreaseQty() {
  if (this.quantity > 1) {
    this.quantity--;
  }
}
  addToCart(productId: string) {
  this._cartService.addToCart(productId,this.quantity).subscribe({
    next: () => {
      alert("Product added to cart!");
    },
    error: () => {
      alert("Failed to add product to cart.");
    }
  });
}
}

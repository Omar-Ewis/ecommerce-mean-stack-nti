import { Component } from '@angular/core';
import { ICart, ICartItem } from '../../core/models/cart.model';
import { CartService } from '../../core/services/layout-services/Cart/cart-service';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import { Router, RouterLink } from '@angular/router';
import { OrderService } from '../../core/services/layout-services/Order/order-service';

@Component({
  selector: 'app-cart',
  imports: [CommonModule,RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart {
  cart: { total: number; data: ICartItem[] } | null = null;
  isLoading = true;
  staticURL=environment.uploadsURL;
  constructor(private cartService: CartService,private _router:Router,private _orderService:OrderService) {}
  ngOnInit(): void {
    this.cartService.getUserCart().subscribe({
      next: (cart) => {
        this.cart = cart;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  // getTotal(): number {
  //   return this.cart?.data.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;
  // }

  removeItem(productId: string) {
    this.cartService.removeFromCart(productId).subscribe({
      next: (cart) => (this.cart = cart),
    });
  }

  clearCart() {
    this.cartService.clearCart().subscribe({
      next: (cart) => (this.cart = cart),
    });
  }

  updateQuantity(productId: string, quantity: string | number) {
    const qty = Number(quantity);
    if (qty < 1) return;

    this.cartService.updateCartItemQuantity(productId, qty).subscribe({
      next: (cart) => (this.cart = cart),
    });
  }
  increaseQuantity(productId: string) {
  const item = this.cart?.data.find(i => i._id === productId);
  if (!item) return;
  this.updateQuantity(productId, item.quantity + 1);
}

decreaseQuantity(productId: string) {
  const item = this.cart?.data.find(i => i._id === productId);
  if (!item || item.quantity <= 1) return;
  this.updateQuantity(productId, item.quantity - 1);
}

getSubtotal(): number {
  return this.cart?.data.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;
}

getTax(): number {
  return +(this.getSubtotal() * 0.14).toFixed(0);
}
getTotal(): number {
  return this.getSubtotal() + this.getTax();
}
// Orders
  // isPlacingOrder = false;
  // onPlaceOrder(){
  //   this.isPlacingOrder = true;
  //   this._orderService.placeOrder().subscribe({
  //     next: (res) => {
  //       alert('Order placed successfully!');
  //       this._router.navigate(['/orders']);
  //     },
  //     error: (err) => {
  //       alert('Failed to place order: ' + (err.error?.message || 'Unknown error'));
  //       this.isPlacingOrder = false;
  //     }
  //   });
  // }
}

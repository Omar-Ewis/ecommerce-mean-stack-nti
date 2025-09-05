import { Component } from '@angular/core';
import { OrderService } from '../../../core/services/layout-services/Order/order-service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-orders',
  imports: [CommonModule,RouterLink],
  templateUrl: './my-orders.html',
  styleUrl: './my-orders.css'
})
export class MyOrders {
    orders: any[] = [];
  isLoading = false;

  constructor(private _orderService: OrderService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this._orderService.getMyOrders().subscribe({
      next: (res: any) => {
        this.orders = res.data || [];
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  cancel(orderId: string): void {
    if (!confirm('Are you sure you want to cancel this order?')) return;

    this._orderService.cancelOrder(orderId).subscribe({
      next: () => {
        this.orders = this.orders.map(order =>
          order._id === orderId ? { ...order, status: 'Canceled' } : order
        );
      },
      error: (err) => {
        console.error(err);
        alert('Failed to cancel the order.');
      }
    });
  }
}

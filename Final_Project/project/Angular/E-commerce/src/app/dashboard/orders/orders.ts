import { Component } from '@angular/core';
import { IOrder } from '../../core/models/order.model';
import { OrdersService } from '../../core/services/dashboard-services/Orders/orders-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-orders',
  imports: [CommonModule,FormsModule],
  templateUrl: './orders.html',
  styleUrl: './orders.css'
})
export class Orders {
  orders: IOrder[] = [];
  isLoading = true;
  statuses = ['pending', 'preparing', 'ready', 'shipped', 'delivered', 'cancelled'];

  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders(): void {
    this.ordersService.getAllOrders().subscribe({
      next: (res) => {
        this.orders = res.data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to fetch orders:', err);
        this.isLoading = false;
      },
    });
  }

onStatusChange(event: Event, orderId: string) {
  const newStatus = (event.target as HTMLSelectElement).value;
  this.ordersService.updateOrderStatus(orderId, newStatus, 'Updated by admin').subscribe({
    next: () => {
      this.getAllOrders();
    },
    error: (err) => {
      console.error('Failed to update status:', err);
    }
  });
}

  softDelete(orderId: string) {
    this.ordersService.softDeleteOrder(orderId).subscribe({
      next: () => {
        this.orders = this.orders.filter(o => o._id !== orderId);
      },
      error: (err) => {
        console.error('Failed to delete order:', err);
      },
    });
  }
}

import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderService } from '../../../core/services/layout-services/Order/order-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  imports: [ReactiveFormsModule],
  templateUrl: './check-out.html',
  styleUrl: './check-out.css'
})
export class CheckOut {
  addressForm!: FormGroup;
  isSubmitting = false;
  constructor(private _orderService: OrderService,private _router: Router) {}
  ngOnInit(): void {
      this.addressForm = new FormGroup({
      governorate: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      street: new FormControl('', Validators.required),
      building: new FormControl(''),
      floor: new FormControl(''),
      apartment: new FormControl(''),
      landmark: new FormControl(''),
      zip: new FormControl(''),
      country: new FormControl('Egypt'),
    });
  }

  confirmOrder() {
    if (this.addressForm.invalid) return;

    this.isSubmitting = true;
    const shippingAddress = this.addressForm.value;

    this._orderService.placeOrder({ shippingAddress }).subscribe({
      next: () => {
        this._router.navigate(['/thanks']);

      },
      error: (err) => {
        console.error(err);
        alert("Failed to place order.");
        this.isSubmitting = false;
}
});
}

}

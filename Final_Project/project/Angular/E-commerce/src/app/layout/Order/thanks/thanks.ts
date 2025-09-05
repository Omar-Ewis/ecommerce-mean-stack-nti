import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-thanks',
  imports: [],
  templateUrl: './thanks.html',
  styleUrl: './thanks.css'
})
export class Thanks {
    constructor(private _router: Router) {}
    goToOrders() {
      this._router.navigate(['/my-orders']);
    }
    goToHome() {
      this._router.navigate(['/home']);
}
}

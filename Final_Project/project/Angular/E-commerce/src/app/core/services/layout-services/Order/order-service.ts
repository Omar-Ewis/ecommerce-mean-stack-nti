import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IOrder } from '../../../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private url = environment.apiURL + '/order';
  constructor(private _http:HttpClient){}
  placeOrder(body: { shippingAddress: any }) {
    return this._http.post(`${this.url}`, body);
  }

  getMyOrders() {
    return this._http.get<IOrder[]>(`${this.url}/my`);
  }

  getOrderById(id: string) {
    return this._http.get<IOrder>(`${this.url}/my/${id}`);
  }

  cancelOrder(id: string) {
    return this._http.patch(`${this.url}/my/${id}/cancel`, {});
  }

}

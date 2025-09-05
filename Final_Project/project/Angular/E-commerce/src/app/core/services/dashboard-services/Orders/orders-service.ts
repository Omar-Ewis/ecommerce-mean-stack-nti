import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IOrder } from '../../../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private url = environment.apiURL + '/order';
  constructor(private _http:HttpClient){}
  getAllOrders(): Observable<{ data: IOrder[] }> {
    return this._http.get<{ data: IOrder[] }>(`${this.url}`);
  }
  updateOrderStatus(orderId: string, newStatus: string, note: string = '') {
    return this._http.patch(`${this.url}/${orderId}/status`, {
      newStatus,
      note
    });
  }
  softDeleteOrder(orderId: string) {
    return this._http.delete(`${this.url}/${orderId}`);
  }

}

import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICart, ICartItem } from '../../../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private url = environment.apiURL + '/cart';
  constructor (private http:HttpClient){}

  getUserCart(): Observable<{ total: number; data: ICartItem[] }> {
    return this.http.get<{ total: number; data: ICartItem[] }>(this.url);
  }

  addToCart(productId: string, quantity: number = 1): Observable<{ total: number; data: ICartItem[] }> {
    return this.http.post<{ total: number; data: ICartItem[] }>(`${this.url}/add`, { productId, quantity });
  }

  updateCartItemQuantity(productId: string, quantity: number): Observable<{ total: number; data: ICartItem[] }> {
    return this.http.patch<{ total: number; data: ICartItem[] }>(`${this.url}/update`, { productId, quantity });
  }

  removeFromCart(productId: string): Observable<{ total: number; data: ICartItem[] }> {
    return this.http.request<{ total: number; data: ICartItem[] }>('delete', `${this.url}/remove`, {
      body: { productId }
    });
  }

  clearCart(): Observable<{ total: number; data: ICartItem[] }> {
    return this.http.delete<{ total: number; data: ICartItem[] }>(`${this.url}/clear`);
  }
}

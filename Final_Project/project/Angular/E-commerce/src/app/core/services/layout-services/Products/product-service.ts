import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IProduct } from '../../../models/product.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = environment.apiURL + '/product';
  constructor(private _http: HttpClient) {}

  getAllProducts(page: number = 1, limit: number = 8): Observable<IProduct[]> {
    const params = new HttpParams().set('page', page).set('limit', limit).set('isActive', 'true').set('isDeleted', 'false');
    return this._http.get<{ data: IProduct[] }>(this.url, { params }).pipe(
      map(res => res.data)
    );
  }
  getProductBySlug(slug: string): Observable<IProduct> {
  return this._http.get<{ data: IProduct }>(`${this.url}/${slug}`).pipe(
    map(res => res.data)
  );
}
  getProductsByCategorySlug(slug: string): Observable<IProduct[]> {
    return this._http.get<{ data: IProduct[] }>(`${this.url}/by-category/${slug}`).pipe(map(res => res.data));
  }

}

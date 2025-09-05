import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { IProduct } from '../../../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductDashboardSercvice {
  private url =environment.apiURL + '/product';
  constructor(private _http: HttpClient) {}

  getAllProducts(params: any = {}): Observable<{data: IProduct[],pages: number,currentPage: number}> {
    return this._http.get<{data: IProduct[],pages: number,currentPage: number}>(this.url + '/admin', { params });
  }
  updateFlags(id: string, flags: { isActive?: boolean, isDeleted?: boolean }): Observable<any> {
    return this._http.patch(`${this.url}/${id}/`, flags);
  }

  updateProduct(id: string, formData: FormData): Observable<any> {
    return this._http.put(`${this.url}/${id}`, formData);
  }

  createProduct(formData: FormData): Observable<any> {
    return this._http.post(this.url, formData);
  }
  getProductBySlug(slug: string): Observable<IProduct> {
  return this._http.get<{ data: IProduct }>(`${this.url}/${slug}`).pipe(
    map(res => res.data)
  );
}
}

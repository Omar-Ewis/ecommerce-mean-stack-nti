import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { map, Observable } from 'rxjs';
import { ICategory } from '../../../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryDashboardService {
  private url = environment.apiURL + '/category';
  constructor(private _http: HttpClient) {}

  getCategoryTreeForAdmin(): Observable<{ data: ICategory[] }> {
    return this._http.get<{ data: ICategory[] }>(`${this.url}/admin`);
  }
  updateCategoryFlag(id: string, flags: Partial<{ isActive: boolean; isDeleted: boolean }>) {
    return this._http.patch(`${this.url}/${id}`, flags);
  }
  createCategory(data: { name: string; parentId?: string }) {
    return this._http.post(`${this.url}`, data);
  }
  getCategoryBySlug(slug: string) {
    return this._http.get<{ data: ICategory }>(`${this.url}/${slug}`);
  }
  updateCategory(id: string, data: { name: string; parentId?: string | null }) {
    return this._http.put(`${this.url}/${id}`, data);
  }
}

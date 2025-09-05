import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestimonialsService {
  private baseUrl = environment.apiURL + '/testimonial';
  constructor(private http: HttpClient) {}
  getAll(): Observable<any> {
    return this.http.get(this.baseUrl + '/all');
  }
  toggleFlag(id: string, field: 'isActive' | 'isDeleted'): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${id}/toggle`, { field });
  }
}

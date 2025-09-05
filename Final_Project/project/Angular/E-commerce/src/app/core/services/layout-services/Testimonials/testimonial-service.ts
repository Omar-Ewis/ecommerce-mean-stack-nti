import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ITestimonial } from '../../../models/testimonials.model';

@Injectable({
  providedIn: 'root'
})
export class TestimonialService {
  private url = environment.apiURL + '/testimonial';
  constructor(private _http: HttpClient) {}
  getPublicTestimonials(): Observable<{ data: ITestimonial[] }> {
    return this._http.get<{ data: ITestimonial[] }>(this.url);
  }
  addTestimonial(data: { name: string; message: string }) {
  return this._http.post(`${this.url}`, data);
}
}

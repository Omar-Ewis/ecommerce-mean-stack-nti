import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IFaq } from '../../../models/faqs.model';

@Injectable({
  providedIn: 'root'
})
export class FaqsDashboardService {
  private url = environment.apiURL + '/faq';
  constructor(private _http: HttpClient) {}
  
  getAllFaqs(): Observable<{ data: IFaq[] }> {
    return this._http.get<{ data: IFaq[] }>(`${this.url}/admin/all`);
  }

  addFaq(body: { question: string; answer: string }): Observable<any> {
    return this._http.post(this.url, body);
  }

  updateFaq(id: string, body: { question: string; answer: string }): Observable<any> {
    return this._http.put(`${this.url}/${id}`, body);
  }

  toggleFlag(id: string, field: 'isActive' | 'isDeleted'): Observable<any> {
    return this._http.patch(`${this.url}/${id}/toggle?field=${field}`, {});
  }
}

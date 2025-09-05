import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IFaq } from '../../../models/faqs.model';

@Injectable({
  providedIn: 'root'
})
export class FaqsService {
  private url = environment.apiURL + '/faq';
  constructor(private _http: HttpClient) {}
  getPublicFaqs(): Observable<{ data: IFaq[] }> {
    return this._http.get<{ data: IFaq[] }>(this.url);
  }
}

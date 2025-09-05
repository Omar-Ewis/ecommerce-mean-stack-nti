import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private _http:HttpClient){}
  private url = environment.apiURL + '/category';
  getCategoryTreeForUser() :Observable<any> {
    return this._http.get(this.url);
  }
}

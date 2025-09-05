import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IReportData } from '../../../models/report.model';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private url = environment.apiURL + '/report/sales';

  constructor(private _http: HttpClient) {}

getSalesReport() {
  return this._http.get<{ message: string; data: IReportData }>(this.url);
}
}

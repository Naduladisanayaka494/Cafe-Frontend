import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  url=environment.apiUrl

  constructor(private httpclient:HttpClient) { }

  getDetails(){
    return this.httpclient.get(this.url+"/dashboard/details");
  }
}

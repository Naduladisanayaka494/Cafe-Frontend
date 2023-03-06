import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url = environment.apiUrl;

  constructor(private httpclient:HttpClient) { }

  add(data:any){
    return this.httpclient.post(this.url+"/category/add",data,{
      headers:new HttpHeaders().set('Content-type',"aplication/json")
    })
  }

  update(data:any){
    return this.httpclient.patch(this.url+"/category/update",data,{
      headers:new HttpHeaders().set('Content-type',"aplication/json")
    })
  }

  getcategories(){
    return this.httpclient.get(this.url+"/category/get")
  }
}

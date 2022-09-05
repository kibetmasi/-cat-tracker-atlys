import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CatService {

  constructor(private http: HttpClient) { }

  getCatDetails(){
    return this.http.get(`${environment.Endpoint}/list`)
  }

  PostCatDetails(data:any){
    return this.http.post(`${environment.Endpoint}/list`, data)
  }

  updateCatDetails(data:any, id:any){
    return this.http.patch(`${environment.Endpoint}/delete/${id}`, data)
  }

  DeleteCatDetails(id:any){
    return this.http.delete(`${environment.Endpoint}/delete/${id}`)
  }
}

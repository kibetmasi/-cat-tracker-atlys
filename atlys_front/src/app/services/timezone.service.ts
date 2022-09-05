import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TimezoneService {

  constructor(
    private http:HttpClient
    ) { }

  getTimezones(){
    return this.http.get(`${environment.timeZoneAPI}/list-time-zone?key=${environment.key}&format=${environment.format}`)
  }
}

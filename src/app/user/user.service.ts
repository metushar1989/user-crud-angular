import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
  ) { }
  apiUrl: string = environment.baseUrl;

  postData(url, data) {
    let httpOptions = { observe: 'response' as 'response' };
    return this.http.post<any[]>(this.apiUrl + url, data, httpOptions).pipe();
  }

  putData(url, data) {
    let httpOptions = { observe: 'response' as 'response' };
    return this.http.put<any[]>(this.apiUrl + url, data, httpOptions).pipe();
  }

  getData(url) {
    let httpOptions = { observe: 'response' as 'response' };
    return this.http.get<any[]>(this.apiUrl + url).pipe();
  }


}

import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.prod';
//import { environment } from 'environments/environment.prod';
//import { environment } from 'environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  actionUrl = '';
  actionUrlOther = '';
  actionUrlsms ="";

  constructor(private http: HttpClient) {
    this.actionUrl =environment.config.apiUrl;
    this.actionUrlOther =environment.config.apiUrlother;
    this.actionUrlsms = environment.config.apiUrlsms;
  }

  public getAll<T>(apiUrl: string): Observable<T> {
    return this.http.get<T>(this.actionUrl + apiUrl);
  }
  public getAllOther<T>(apiUrl: string): Observable<T> {
    return this.http.get<T>(this.actionUrlOther + apiUrl);
  }
 
 public getAllsms<T>(apiUrl: string): Observable<T> {
    return this.http.get<T>(this.actionUrlsms + apiUrl);
  }
 
  public getById<T>(apiUrl: string, id: number): Observable<T> {
    return this.http.get<T>(this.actionUrl + apiUrl + id);
  }

  public post<T>(apiUrl: string, data: T): Observable<T> {
   
    console.log(this.actionUrl + apiUrl);
    console.log(data);
    return this.http.post<T>(this.actionUrl + apiUrl, data);
  }

  public postOther<T>(apiUrl: string, data: T): Observable<T> {
   
    console.log(this.actionUrlOther + apiUrl);
    console.log(data);
    return this.http.post<T>(this.actionUrlOther + apiUrl, data);
  }
 
  public update<T>(apiUrl: string, id: number, data: T): Observable<T> {
    return this.http
      .put<T>(this.actionUrl + apiUrl + id, data);
  }

  public delete<T>(apiUrl: string, id: number): Observable<T> {
    return this.http.delete<T>(this.actionUrl + apiUrl + id);
  }

  public getmethod<T>(apiUrl: string): Observable<T> {
    return this.http.get<T>(apiUrl);
  }

 
}



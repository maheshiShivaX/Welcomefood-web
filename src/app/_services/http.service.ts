import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../environments/environment.prod';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
//import { environment } from 'environments/environment.prod';
//import { environment } from 'environments/environment.prod';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  actionUrl = '';
  actionUrlOther = '';
  actionUrlsms = "";
  token: any;
  constructor(private http: HttpClient, private router: Router) {
    this.actionUrl = environment.config.apiUrl;
    this.actionUrlOther = environment.config.apiUrlother;
    this.actionUrlsms = environment.config.apiUrlsms;
  }

  public getAll<T>(apiUrl: string): Observable<T> {
   
    this.token = localStorage.getItem("authtoken");
   // console.log('4',this.token);
    if (this.token == null || this.token == '') {
      this.router.navigateByUrl('auth/logindetail');
    }
    if (this.token && this.isTokenExpired(this.token)) {
     // console.log('Token has expired, logging out...');
      // Optionally log out the user or refresh the token
      localStorage.removeItem('authToken');
    //  alert('Your Session is expired,Please Login Again')
      this.router.navigateByUrl('auth/logindetail');
      // Redirect to login page
    } else {
     // console.log('Token is valid');
      // Proceed with normal application logic
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    //return this.http.get<T>(this.actionUrl + apiUrl,{headers});
    return this.http.get<T>(this.actionUrl + apiUrl, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Handle the invalid token error
          console.error('Invalid token, user needs to log in again.');
          // Optionally: Remove the invalid token from localStorage
          localStorage.removeItem('authToken');
          // Optionally: Redirect to login page
          // this.router.navigate(['/login']);
        }
        // Rethrow the error if necessary
        return throwError(error);
      })
    );
  }


  public getAllwithtoken<T>(apiUrl: string): Observable<T> {
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

  public postwithtoken<T>(apiUrl: string, data: T): Observable<T> {

   // console.log('2',data);
    return this.http.post<T>(this.actionUrl + apiUrl, data);
  }

  public post<T>(apiUrl: string, data: T): Observable<T> {
    // Retrieve the authentication token from localStorage (or wherever it's stored)
    this.token = localStorage.getItem("authtoken");  // Replace with your token retrieval logic

   // console.log('3',this.token);
    if (this.token == null || this.token == '') {
      this.router.navigateByUrl('auth/logindetail');
    }
    if (this.token && this.isTokenExpired(this.token)) {
      console.log('checktoken',this.token);
      console.log('Token has expired, logging out...');
      // Optionally log out the user or refresh the token
      localStorage.removeItem('authToken');
   //   alert('Your Session is expired,Please Login Again')
      this.router.navigateByUrl('auth/logindetail');
      // Redirect to login page
    } else {
     // console.log('Token is valid');
      // Proceed with normal application logic
    }
    // Set the headers with the Authorization token
    const headers = new HttpHeaders({
      'Authorization': this.token ? `Bearer ${this.token}` : '',  // Include token if available
                // Set Content-Type to application/json
    });

    // Make the POST request with the data and headers
    return this.http.post<T>(this.actionUrl + apiUrl, data, { headers });

    


  }


  public postOther<T>(apiUrl: string, data: T): Observable<T> {


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

  public isTokenExpired(token: string): boolean {
    try {
      // Decode the JWT token
      const decoded: any = jwtDecode(token);

      // Get the expiration time (exp) from the decoded token
      const expTime = decoded.exp;
//console.log(expTime);
      // Get the current time in seconds (JWT exp time is in seconds, not milliseconds)
      const currentTime = Math.floor(Date.now() / 1000);

      // Compare expiration time with current time
      return expTime < currentTime;
    } catch (error) {
      // If there is an error decoding the token (e.g., invalid format), return true
      console.error('Error decoding token:', error);
      return true;
    }
  }
}





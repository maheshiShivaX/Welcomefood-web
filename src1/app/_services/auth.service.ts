import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpService } from './http.service';
import { environment } from '../environments/environment.prod';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  str: any = '';
  result: any;
  loggedInUser: User | null = null;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  defaultUserData: User = {
    roleName:'Public',
    modifiedBy:0,
    createdDate:"",
    modifiedDate:"",
    isDeleted:false,
    loginId:0,
    employeeId:0,
    userId:'',
    password:'',
    roleId:0,
    isApproved:false,
    isLocked:false,
    isActive:true,
    createdBy:0,
    landingUrl:'/auth/logindetail',
    name:''
    // Add other default values as needed
  };

  constructor(private http: HttpService, private https: HttpClient, private router: Router) {
    debugger;
    let a = localStorage.getItem('currentUser');
    if (a != null) {
      this.str = localStorage.getItem('currentUser');
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(this.str));

      this.currentUser = this.currentUserSubject.asObservable();
    }else
    {
      localStorage.setItem('currentUser', JSON.stringify(this.defaultUserData));
      this.str = localStorage.getItem('currentUser');
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(this.str));

      this.currentUser = this.currentUserSubject.asObservable();
    }
   



  }
  logout() {
    localStorage.setItem('currentUser', JSON.stringify(this.defaultUserData));
    this.currentUserSubject.next(this.defaultUserData);
    this.router.navigateByUrl(this.defaultUserData.landingUrl);
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  setLoggedInUser(user: User): void {
    this.loggedInUser = user;
    this.currentUserSubject.next(this.loggedInUser);
    this.router.navigateByUrl(this.loggedInUser.landingUrl);
  }

  getLoggedInUser(): User | null {
    return this.loggedInUser;
  }
}
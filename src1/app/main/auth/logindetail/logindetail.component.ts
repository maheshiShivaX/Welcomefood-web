import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/_services/auth.service';
import { HttpService } from 'src/app/_services/http.service';
import { environment } from 'src/app/environments/environment.prod';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-logindetail',
  templateUrl: './logindetail.component.html',
  styleUrls: ['./logindetail.component.scss']
})
export class LogindetailComponent {

  isLoading :boolean= false;
  submitted :boolean= false;
  //  private currentUserSubject: BehaviorSubject<User>;
  //  public currentUser: Observable<User>;

  public form = new FormGroup({
    userId: new FormControl(''),
    password: new FormControl(''),
  });
str:any;
  constructor(private http: HttpService, private router: Router,private authService: AuthService) {
   
    // let a= localStorage.getItem('currentUser');
    // if(a!=null)
    //   {
    //     this.str = localStorage.getItem('currentUser');
    //   }
  
    // this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(this.str));
    
    // this.currentUser = this.currentUserSubject.asObservable();

  }
  ngOnInit() {

  }




  onLogin() {
    this.isLoading = true;
    this.submitted = true;
    if (this.form.invalid) {
      this.isLoading = false;
      return;
    }
    this.http.getAll(environment.GetLoginDetailByUserIdPassword + "?pUserId=" + this.form.value.userId + "&pPassword=" + this.form.value.password).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        console.log(result);
        debugger;
      
        this.isLoading = false;
        this.submitted = false;
        console.log(result.data);
        localStorage.setItem('currentUser', JSON.stringify(result.data[0]));
        this.authService.setLoggedInUser(result.data[0]);
       
      }
      else {
        console.log(result);
        this.isLoading = false;
        this.submitted = false;
      }
    });
  }
}


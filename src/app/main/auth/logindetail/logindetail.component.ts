import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/_services/auth.service';
import { HttpService } from 'src/app/_services/http.service';
import { environment } from 'src/app/environments/environment.prod';
import { User } from 'src/app/model/user.model';
import * as CryptoJS from 'crypto-js';
import { EncryptionService } from 'src/app/_services/encrypt.service'; 
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
  loggedInUser: User | null = null;
  public form = new FormGroup({
    userId: new FormControl(''),
    password: new FormControl(''),
  });
str:any;
  constructor(private http: HttpService, private router: Router,private authService: AuthService, private decryptionService: EncryptionService) {

    // let a= localStorage.getItem('currentUser');
  
    // if(a!=null)
    //   {
    //     this.str= a;
    //     console.log(this.str);
    //     this.router.navigateByUrl(this.str.landingUrl);
    //   }

  }
  ngOnInit() {
    // let a= localStorage.getItem('currentUser');
  
    // if(a!=null)
    //   {
    //     this.str= a;
    //     this.router.navigateByUrl(this.str.landingUrl);
    //   }

    //this.authService.logout()

  }




  onLogin1() {
    this.isLoading = true;
    this.submitted = true;
    if (this.form.invalid) {
      this.isLoading = false;
      return;
    }
    this.http.getAll(environment.GetLoginDetailByUserIdPassword + "?pUserId=" + this.form.value.userId + "&pPassword=" + this.form.value.password).subscribe((result: any) => {
      if (result.isSuccess == 1) {
    
      
        this.isLoading = false;
        this.submitted = false;
      
        localStorage.setItem('currentUser', JSON.stringify(result.data[0]));
        this.authService.setLoggedInUser(result.data[0]);
      }
      else {
        this.isLoading = false;
        this.submitted = false;
      }
    });
  }

  // decryptData() {
  //   // Decrypt the encrypted text using the same key
  //   const bytes = CryptoJS.AES.decrypt(this.encryptedText, this.encryptionKey);
  //   this.decryptedText = bytes.toString(CryptoJS.enc.Utf8);
  //   console.log('Decrypted Text:', this.decryptedText);
  // }
  authtoken:any;
  decryptedText:any;
  res:any;
  onLogin() {
    this.isLoading = true;
    this.submitted = true;
    if (this.form.invalid) {
      this.isLoading = false;
      return;
    }
    this.http.postwithtoken(environment.login , this.form.value).subscribe((result: any) => {
      if (result.isSuccess == 1) {
      
      
        this.isLoading = false;
        this.submitted = false;
        this.res= this.decryptionService.descpt(result.data);
        this.authtoken = result.token;
        localStorage.setItem("authtoken",this.authtoken);
       // console.log('1',this.authtoken);
       localStorage.setItem('currentUser', JSON.stringify(this.res[0]));
       this.authService.setLoggedInUser(this.res[0]);
      }
      else {
        this.isLoading = false;
        this.submitted = false;
      }
    });
  }

  
  

  
 descpt(encryptedData: string, key: any, iv: any): string  {
      // Ensure encrypted data is in Base64 format
    
      const parsedCiphertext = CryptoJS.enc.Base64.parse(encryptedData);
  
      // Decrypt the data
      const decryptedData = CryptoJS.AES.decrypt(encryptedData, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
  
      // Convert decrypted data to string (UTF-8)
      const result = decryptedData.toString(CryptoJS.enc.Utf8);
  
      // Return the decrypted result
      return result;
  };
}


import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './_services/auth.service';
import { HttpService } from './_services/http.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'wfapp';

  roleId:any;
  constructor(private router: Router, private authService: AuthService,
    private http: HttpService,
  ) {


   

    this.authService.currentUser.subscribe((user) => {
      const currentUser = user;
 
      this.roleId=currentUser.roleId;

    });


  }

  currentUrl:any;

  ngOnInit() {

    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentUrl = event.url;
     // alert(this.currentUrl);

      if (this.currentUrl.includes("/auth/logindetail")) {
        this.roleId=0;
      } else {
      }
    });
    

    this.authService.currentUser.subscribe((user) => {

      const currentUser = user;

      this.roleId=currentUser.roleId;
    });
  }


}

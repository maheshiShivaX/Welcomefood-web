import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './_services/auth.service';
import { HttpService } from './_services/http.service';

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



  ngOnInit() {

    this.authService.currentUser.subscribe((user) => {
    //  alert('saddfg');
      const currentUser = user;
      this.roleId=currentUser.roleId;
    });


    //  this.getmenu(1, 2)
  }


}

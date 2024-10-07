import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { HttpService } from 'src/app/_services/http.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private http: HttpService, private router: Router, private authService: AuthService) {
    this.authService.currentUser.subscribe((user) => {

      console.log(user);
      const currentUser = user;
      this.username = currentUser.name;
      this.rolename = currentUser.roleName;
    });


  }
  username:any;
  rolename:any;
  
 
  openPopup() {
    const popupContainer = document.getElementById('termpopupContainer');
    if (popupContainer) {
      popupContainer.style.display = 'block';
    }
  }

  closePopup() {
    this.authService.logout();

    const popupContainer = document.getElementById('termpopupContainer');
    if (popupContainer) {
      popupContainer.style.display = 'none';
    }
  }

  cancelPopup() {

    const popupContainer = document.getElementById('termpopupContainer');
    if (popupContainer) {
      popupContainer.style.display = 'none';
    }
  }


  openNotification() {
    const popupContainer = document.getElementById('notificationContainer');
    if (popupContainer) {
      if (popupContainer.style.display === 'block') {
        popupContainer.style.display = 'none';
      } else {
        popupContainer.style.display = 'block';
      }
    } else {
      console.error('Notification container not found.');
    }
  }

  closeNotification() {
    const popupContainer = document.getElementById('notificationContainer');
    if (popupContainer) {
      popupContainer.style.display = 'none';
    }
  }

  onLogout() {
    this.openPopup();
  }
}

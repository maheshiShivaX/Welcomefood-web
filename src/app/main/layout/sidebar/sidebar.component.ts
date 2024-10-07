import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { HttpService } from 'src/app/_services/http.service';
import { environment } from 'src/app/environments/environment.prod';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  menu: any;

  activeIndex = 0;
  loggedInUser: User | null = null;
  username:any;
  rolename:any;
  roleId:any='2';
  //private dataChangeSubscription: Subscription;
  toglarStatus: boolean = false

  constructor(private router: Router, private authService: AuthService,
    private http: HttpService,
  ) {

    this.authService.currentUser.subscribe((user) => {
      const currentUser = user;
      this.roleId=currentUser.roleId;
      this.getmenu(1, currentUser.roleId);
      // Update menu based on user authentication state
    });

    // this.dataChangeSubscription = this.menuService.dataChange$.subscribe(() => {
    //   const currentUser = this.authService.currentUserValue;
    //   console.log(currentUser);
    //   if (currentUser != null) {
    //     this.getmenu(1, currentUser.roleId);
    //     this.username=currentUser.name;
    //     this.rolename=currentUser.roleName;
    //   }else
    //   {
    //     this.getmenu(1, 2);
    //   }
    // });
  }

  showMenu: boolean = false;

  

  onClose() {
    this.toglarStatus = false
}


  onLogout()
  {
    this.authService.logout(); 
  }


  ngOnInit() {

    this.authService.currentUser.subscribe((user) => {
    //  alert('saddfg');
      const currentUser = user;
      this.getmenu(1, currentUser.roleId);
      // Update menu based on user authentication state
    });


    //  this.getmenu(1, 2)
  }

  currentlyOpenMenu: HTMLElement | null = null;

  showSubmenu(itemEl: HTMLElement, item: any) {
      if (!itemEl) return;
  
      if (item.type === 'collapsible') {
          if (this.currentlyOpenMenu && this.currentlyOpenMenu !== itemEl) {
              this.currentlyOpenMenu.classList.remove("showMenu");
          }
          itemEl.classList.toggle("showMenu");
          this.currentlyOpenMenu = itemEl;
      } else {
        if (this.currentlyOpenMenu && this.currentlyOpenMenu !== itemEl) {
          this.currentlyOpenMenu.classList.remove("showMenu");
      }
          this.router.navigateByUrl(item.url);
      }
  }

  
  // showSubmenu(itemEl: HTMLElement,item:any) {
  //   if (item.type == 'collapsible') {
  //     itemEl.classList.toggle("showMenu");
  //   }else {
  //     this.router.navigateByUrl(item.url);
  //   }
  // }

  setActiveIndex(index: number): void {
    this.activeIndex = index;
    // Add logic here to handle menu item click or navigation
  }
  getmenu(pMenuTypeId: number, pRoleId: number) {
    this.http.getAll(environment.GetMenuDetailByTypeId + "?pMenuTypeId=" + pMenuTypeId + "&pRoleId=" + pRoleId).subscribe((result: any) => {
      if (result.isSuccess == 1) {


        this.menu = result.data;
        console.log(this.menu);

      }
      else {
      }
    })
  }

  updateMenu(): void {
    // Logic to update the menu after a successful login
  }
}


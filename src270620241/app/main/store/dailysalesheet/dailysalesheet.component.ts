import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth.service';
import { HttpService } from 'src/app/_services/http.service';
import { environment } from 'src/app/environments/environment.prod';


@Component({
  selector: 'app-dailysalesheet',
  templateUrl: './dailysalesheet.component.html',
  styleUrls: ['./dailysalesheet.component.scss']
})
export class DailysalesheetComponent {

  loginId:any;
  storedetail:any;
  storeid:any;

  fromDate:any;
  toDate:any;
  constructor(private router: Router, private authService: AuthService, private route: ActivatedRoute,
    private http: HttpService, private toastr: ToastrService
  ) {
    this.authService.currentUser.subscribe((user) => {

      console.log(user);
      const currentUser = user;
      this.loginId = currentUser.loginId;
      // Update menu based on user authentication state
    });


    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = ('0' + (today.getMonth() + 1)).slice(-2); // Add leading zero, month starts at 0
    const dd = ('0' + today.getDate()).slice(-2); // Add leading zero
    this.fromDate= `${yyyy}-${mm}-${dd}`;
     this.toDate = `${yyyy}-${mm}-${dd}`;

  }

  public form = new FormGroup({
    storeId: new FormControl(0),
    fromDate: new FormControl(''),
    toDate: new FormControl(''),
  });


   // =============================================================================
   ngOnInit() {
  

    this.GetEmployeeStoreByUserId();
   // this.route.snapshot.params["storeId"];
    

  }

 

  storeList:any
  // fromDate:any;
  // toDate:any;

  onGetReport()
  {
    
  }


  GetEmployeeStoreByUserId() {

    this.http.getAll(environment.GetEmployeeStoreByUserId +"?pUserId=" + this.loginId ).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        console.log(result.data)
        this.storeList = result.data;
     
       
      }
      else { this.storeList = null;
      }
    })
  }


}

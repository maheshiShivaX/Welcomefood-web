import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth.service';
import { HttpService } from 'src/app/_services/http.service';
import { environment } from 'src/app/environments/environment.prod';

@Component({
  selector: 'app-plsheet',
  templateUrl: './plsheet.component.html',
  styleUrls: ['./plsheet.component.scss']
})
export class PlsheetComponent {

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

  GetPLStoreDetail(pStoreId: any, pFromDate: any,pToDate :any) {

    this.http.getAll(environment.GetPLStoreDetail + "?pStoreId=" + pStoreId + "&pFromDate=" + pFromDate + "&pToDate=" + pToDate).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        console.log(result.data)
        this.storedetail = result.data;
      }
      else {
        this.storedetail = null;
      }
    })
  }

  storeList:any
  // fromDate:any;
  // toDate:any;


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


  GetStoreDetailAll() {
    this.http.getAll(environment.GetStoreDetail).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        console.log(result.data)
        this.storeList = result.data;
      }
      else {
        this.storeList = null;
      }
    })
  }
  onGetReport()
  {
    console.log(this.form.value);


    this.GetPLStoreDetail(this.form.value.storeId, this.form.value.fromDate,this.form.value.toDate)
  }
}

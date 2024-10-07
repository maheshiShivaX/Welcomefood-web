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
  vendorCategoryAmountscase:any;
  vendorCategoryAmountscheque:any;
  categories: any;
  totalAmounts: { [key: string]: number } = {};
  totalAmountscheque: { [key: string]: number } = {};
  totalamountpurchasecash: number = 0;
  totalamountpurchasecheque: number = 0;
  calculateTotalAmounts(): void {
    this.totalAmounts = {};
    for (let category of this.categories) {
      this.totalAmounts[category] = this.vendorCategoryAmountscase.reduce((sum: any, item: { amounts: { [x: string]: any; }; }) => sum + (item.amounts[category] || 0), 0);
      this.totalamountpurchasecash = this.totalamountpurchasecash + (+this.totalAmounts[category]);
    }
  }
  calculateTotalAmountscheck(): void {
    this.totalAmountscheque = {};
    for (let category of this.categories) {
      this.totalAmountscheque[category] = this.vendorCategoryAmountscheque.reduce((sum: any, item: { amounts: { [x: string]: any; }; }) => sum + (item.amounts[category] || 0), 0);
      this.totalamountpurchasecheque = this.totalamountpurchasecheque + (+this.totalAmountscheque[category]);
    }
  }

  getTotalAmountForVendor(vendor: any): number {
    return this.categories.reduce((sum: any, category: string | number) => sum + (vendor.amounts[category] || 0), 0);
  }

  GetPLStoreDetail(pStoreId: any, pFromDate: any,pToDate :any) {

    this.http.getAll(environment.GetPLStoreDetail + "?pStoreId=" + pStoreId + "&pFromDate=" + pFromDate + "&pToDate=" + pToDate).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        console.log(result.data)
        this.storedetail = result.data;


        this.vendorCategoryAmountscase = this.storedetail.purchaseCash;
        if (this.vendorCategoryAmountscase.length > 0) {
          this.categories = Object.keys(this.vendorCategoryAmountscase[0].amounts);
        }
        this.calculateTotalAmounts();

        this.vendorCategoryAmountscheque = this.storedetail.purchaseCheque;
        if (this.vendorCategoryAmountscheque.length > 0) {
          this.categories = Object.keys(this.vendorCategoryAmountscheque[0].amounts);
        }
        this.calculateTotalAmountscheck();

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
  storename:any;

  onGetReport()
  {
    console.log(this.form.value);

this.storename = this.storeList.filter((x: { storeId: number | null | undefined; })=>x.storeId==this.form.value.storeId)[0].storeName
    this.GetPLStoreDetail(this.form.value.storeId, this.form.value.fromDate,this.form.value.toDate)

    this.reporttype='plreport';
  }

  reporttype:any;
  onChange(reporttype :any)
  {

  this.reporttype=reporttype;
}
  }


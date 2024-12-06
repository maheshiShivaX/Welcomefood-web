import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth.service';
import { HttpService } from 'src/app/_services/http.service';
import { MonthService } from 'src/app/_services/month.service';
import { environment } from 'src/app/environments/environment.prod';

@Component({
  selector: 'app-balancesheet',
  templateUrl: './balancesheet.component.html',
  styleUrls: ['./balancesheet.component.scss']
})
export class BalancesheetComponent {


  
  loginId:any;
  storedetail:any;
  storeid:any;

  fromDate:any;
  toDate:any;
  storeList:any;
  constructor(private router: Router, private authService: AuthService, private route: ActivatedRoute,private monthService: MonthService,
    private http: HttpService, private toastr: ToastrService
  ) {
    this.authService.currentUser.subscribe((user) => {

  
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
    month:new FormControl('')
  });


   // =============================================================================
   ngOnInit() {
  
    const today = new Date();
    const yyyy = today.getFullYear();
 
    //const year = 2024; // You can change this dynamically or make it user-input
    this.paymentOptions = this.monthService.getPaymentOptions(yyyy);
    this.GetEmployeeStoreByUserId();
   // this.route.snapshot.params["storeId"];
    



  }

  paymentOptions: { label: string; fromdate: string; todate: string; }[]=[] ;



  balancesheetData:any;

  GetBalanceSheetByStoreId(pStoreId: any, pFromDate: any, pToDate: any) {

    if (pStoreId != "" && pStoreId != null && pFromDate != "" && pFromDate != null && pToDate != "" && pToDate != null) {

      this.http.getAll(environment.GetBalanceSheetByStoreId + "?pStoreId=" + pStoreId + "&pFromDate=" + pFromDate + "&pToDate=" + pToDate).subscribe((result: any) => {
        if (result.isSuccess == 1) {
          
          this.balancesheetData = result.data;


        }
        else {
          this.balancesheetData = null;
        }
      })
    } else {

    }
  }


  onAMount(item:any):any
  {

    
  var res= item.bsitemIDtos.reduce((acc: any, item: { amount: any; }) => acc + (item.amount || 0), 0);
  return res;
  }
  
  GetEmployeeStoreByUserId() {

    this.http.getAll(environment.GetEmployeeStoreByUserId +"?pUserId=" + this.loginId ).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        
        this.storeList = result.data;
     
       
      }
      else { this.storeList = null;
      }
    })
  }
  datelist:any;
  onGetReport()
  {
    this.datelist=this.paymentOptions.filter(x=>x.label==this.form.value.month)[0]
    this.form.patchValue({
    
      fromDate: this.datelist.fromdate,
      toDate:this.datelist.todate
    });

    this.fromDate =this.datelist.fromdate;
this.toDate=this.datelist.todate


    this.GetBalanceSheetByStoreId(this.form.value.storeId, this.form.value.fromDate, this.form.value.toDate)
  }

  // onStoreChange(StoreId:any)
  // {
  //   this.GetBalanceSheetByStoreId(this.form.value.storeId, this.form.value.fromDate, this.form.value.toDate)
  // }
  // oninputchnage(fromdate:any)
  // {
  //   this.GetBalanceSheetByStoreId(this.form.value.storeId, this.form.value.fromDate, this.form.value.toDate)
  // }


  onBalancesheet()
  {
    this.router.navigateByUrl('store/newbalancesheet');
  }
}

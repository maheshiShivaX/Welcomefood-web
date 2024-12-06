import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth.service';
import { HttpService } from 'src/app/_services/http.service';
import { MonthService } from 'src/app/_services/month.service';
import { environment } from 'src/app/environments/environment.prod';

@Component({
  selector: 'app-newbalancesheet',
  templateUrl: './newbalancesheet.component.html',
  styleUrls: ['./newbalancesheet.component.scss']
})
export class NewbalancesheetComponent {

  loginId: any;
  storedetail: any;
  storeid: any;

  fromDate: any;
  toDate: any;
  storeList: any;
  entryDate: any;
  balancesheetData: any;

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
  onStoreChange(StoreId:any)
  {
    this.GetBalanceSheetByStoreId(this.form.value.storeId, this.form.value.fromDate, this.form.value.toDate)
  }
  oninputchnage(fromdate:any)
  {
    this.GetBalanceSheetByStoreId(this.form.value.storeId, this.form.value.fromDate, this.form.value.toDate)
  }
  GetEmployeeStoreByUserId() {

    this.http.getAll(environment.GetEmployeeStoreByUserId + "?pUserId=" + this.loginId).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        
        this.storeList = result.data;


      }
      else {
        this.storeList = null;
      }
    })
  }


  validateNumber(event: KeyboardEvent) {
    const charCode = event.which ? event.which : event.keyCode;
    const inputChar = String.fromCharCode(charCode);
    const pattern = /[0-9]|\./;

    if (!pattern.test(inputChar) && charCode > 31) {
      event.preventDefault();
    }

  }
  validateDecimalPlaces(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;

    if (value.includes('.') && value.split('.')[1].length > 2) {
      inputElement.value = value.substring(0, value.length - 1);
    }
  }
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
    this.fromDate = `${yyyy}-${mm}-${dd}`;
    this.toDate = `${yyyy}-${mm}-${dd}`;

  }
  public form = new FormGroup({
    storeId: new FormControl(0),
    fromDate: new FormControl(''),
    toDate: new FormControl(''),
    month:new FormControl('')
  });
  public formB = new FormGroup({
    storeId: new FormControl(0),
    periodDateFrom: new FormControl(''),
    periodDateTo: new FormControl(''),

    btype: new FormControl(''),
    bsitemId: new FormControl(0),
    balanceSheetId: new FormControl(0),
    termsId: new FormControl(0),
    name: new FormControl(''),
    amount: new FormControl(0),
    entryDate: new FormControl(''),
    isActive: new FormControl(true),
    createdBy: new FormControl(0),
  });

  options = [
    { value: 'A', label: 'Assets' },
    { value: 'L', label: 'Liabilities' },

  ];

  ngOnInit() {

    const today = new Date();
    const yyyy = today.getFullYear();
   
    //const year = 2024; // You can change this dynamically or make it user-input
    this.paymentOptions = this.monthService.getPaymentOptions(yyyy);

    // this.storeid = localStorage.getItem("storeid");
    this.GetEmployeeStoreByUserId();
    this.GetBalanceSheetTerm();

  }

  paymentOptions: { label: string; fromdate: string; todate: string; }[]=[] ;
  termdetail: any;
  ontermschange(pid: any) {


    this.termdetail = this.termslist.filter((x: { termsType: any; }) => x.termsType == pid);
  }

  termslist: any;
  GetBalanceSheetTerm() {
    this.http.getAll(environment.GetBalanceSheetTerm).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        
        this.termslist = result.data;
      }
      else {
        // this.products = null;
      }
    })
  }

onAMount(item:any):any
{

  
var res= item.bsitemIDtos.reduce((acc: any, item: { amount: any; }) => acc + (item.amount || 0), 0);
return res;
}
datelist:any;

onMonthChange(event: any): void {

  this.datelist=this.paymentOptions.filter(x=>x.label==this.form.value.month)[0]
    this.form.patchValue({
    
      fromDate: this.datelist.fromdate,
      toDate:this.datelist.todate
    });
    this.fromDate =this.datelist.fromdate;
    this.toDate=this.datelist.todate
  this.GetBalanceSheetByStoreId(this.form.value.storeId, this.form.value.fromDate, this.form.value.toDate);
}
  onSubmit() {

    this.datelist=this.paymentOptions.filter(x=>x.label==this.form.value.month)[0]
    this.form.patchValue({
    
      fromDate: this.datelist.fromdate,
      toDate:this.datelist.todate
    });
    this.fromDate =this.datelist.fromdate;
    this.toDate=this.datelist.todate
    
    this.formB.patchValue({
      storeId:this.form.value.storeId,
      periodDateFrom: this.form.value.fromDate,
      periodDateTo: this.form.value.toDate,
      entryDate: this.form.value.fromDate,
    });
    if (this.formB.value.amount == 0) {

      this.toastr.error('Please enter valid amount')
      return;
    }

   ;
 
    if (this.formB.invalid) {

      return;
    }
   // return;

    this.http.post(environment.BalanceSheet, this.formB.value).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        // this.GetOtherIncomebyStoreId(this.storeid, this.entryDate);
        this.GetBalanceSheetByStoreId(this.form.value.storeId, this.form.value.fromDate, this.form.value.toDate);
        // this.onReset();
        this.toastr.success(result.message);
        this.onReset();
      }
      else {
    
        this.toastr.error(result.message);
      }
    });
  }


  onReset()
  {
   this.formB.patchValue({
  
    btype: '',
    bsitemId: 0,
    balanceSheetId:0,
    termsId: 0,
    name: '',
    amount:0,
    entryDate: '',
    isActive: true,
    createdBy: 0,
   }); 
  }
}

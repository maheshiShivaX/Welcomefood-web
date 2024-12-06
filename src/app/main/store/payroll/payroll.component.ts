import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/_services/auth.service';
import { HttpService } from 'src/app/_services/http.service';
import { TriggerdailyService } from 'src/app/_services/triggerdaily.service';
import { environment } from 'src/app/environments/environment.prod';

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.scss']
})
export class PayrollComponent {

  @Input() storesdata: { storeid: string; fromdate: string, todate :string }[] = [];
  entryDate:any;
  selectedOption:any;
  companyId:any;
  private dataChangeSubscription: Subscription;
  constructor(private router: Router, private authService: AuthService, private route: ActivatedRoute,
    private http: HttpService, private toastr: ToastrService, private dataService: TriggerdailyService) {
    this.entryDate = new Date().toISOString().split('T')[0];
    this.selectedOption = 1;

    this.authService.currentUser.subscribe((user) => {
      const currentUser = user;
      // this.formExpense.value.createdBy = currentUser.loginId;
      this.companyId = currentUser.companyId;
    });

    this.dataChangeSubscription = this.dataService.dataChange$.subscribe((menutype: any) => {
    
      if(menutype=='4')
      {
        this.storeid =localStorage.getItem("storeid")?.toString();
        this.entryDate =localStorage.getItem("tentrydate") ;
       
      this. GetPayMode() ;
       this.GetEmployeeByStoreId( this.storeid)
       this.GetSalaryTransactionByStoreId(this.storeid, this.entryDate);
      }
      
    });
  }

public form = new FormGroup({
  salaryTransactionId: new FormControl(0),
  employeeId: new FormControl(0),
  storeId: new FormControl(0),
  payModeId: new FormControl(0),
  amountDate: new FormControl(''),
  amount: new FormControl(''),
  isActive: new FormControl(true),
  createdBy: new FormControl(0),
  chequeNo: new FormControl(''),
  description:new FormControl(''),
});

storeid:any;
employeeList:any

ngOnInit() {

   // alert('asdf');
   this.storeid =this.storesdata[0].storeid;// localStorage.getItem("storeid");
   //this.tstoreid =this.storesdata[0].storeid;// localStorage.getItem("tStoreId");
   this.entryDate = this.storesdata[0].fromdate; //localStorage.getItem("tfromdate");
   



 this. GetPayMode() ;
  this.GetEmployeeByStoreId( this.storeid)
  this.GetSalaryTransactionByStoreId(this.storeid, this.entryDate);
}



GetEmployeeByStoreId( pGroupId: any) {
    this.http.getAll(environment.GetStoreEmployeeByStoreId + "?pStoreId=" + this.storeid ).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        
        this.employeeList = result.data;
      }
      else {
        this.employeeList = null;
      }
    })
  }
  salarytransaction:any;
  GetSalaryTransactionByStoreId( pStoreId: any , pAmountDate:any) {
    this.http.getAll(environment.GetSalaryTransactionByStoreId + "?pStoreId=" + this.storeid+ "&pAmountDate="+ pAmountDate ).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        
        this.salarytransaction = result.data;
      }
      else {
        this.salarytransaction = null;
      }
    })
  }
  

  onDeleteSalaryTransactionById( pSalaryTransactionId: any) {
    this.http.getAll(environment.DeleteSalaryTransactionById + "?pSalaryTransactionId=" + pSalaryTransactionId ).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        
        this.salarytransaction = result.data;
        this.GetSalaryTransactionByStoreId(this.storeid, this.entryDate);
      }
      else {
        this.salarytransaction = null;
      }
    })
  }


  paymode:any;
  GetPayMode() {

    this.http.getAll(environment.GetPayMode  ).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        
        this.paymode = result.data;
 
      }
      else {
        this.paymode = null;
      }
    })
  }

  onPaymodechange(id:any)
  {
this.selectedOption=id;
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


  onSubmit() {


    this.form.patchValue({
      storeId: this.storeid,
      amountDate: this.entryDate,
    });
    if (this.form.value.amount == '0.00' || this.form.value.amount == '') {

      this.toastr.error('Please enter valid amount')
      return;
    }

   ;
    if (this.form.invalid) {

      return;
    }

    this.http.post(environment.SaveSalaryTransaction, this.form.value).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        this.GetSalaryTransactionByStoreId(this.storeid, this.entryDate);
        
        this.onReset();
        this.toastr.success(result.message);
      }
      else {
    
        this.toastr.error(result.message);
      }
    });
  }
  onReset()
  {
    this.form.patchValue({
      salaryTransactionId: 0,
      storeId: 0,
      employeeId: 0,
      payModeId: 0,
      amountDate:'',
      amount: '0.00',
      isActive:true,
      chequeNo:'',
      description:''
    });
  }
salaryList:any;

  onedit(pid:any)
  {
    this.salaryList = this.salarytransaction.filter((x: {salaryTransactionId: any; }) => x.salaryTransactionId == pid);

    this.form.patchValue({
      salaryTransactionId: this.salaryList[0].salaryTransactionId,
      storeId: this.salaryList[0].storeId,
      employeeId: this.salaryList[0].employeeId,
      payModeId: this.salaryList[0].payModeId,
      amountDate: this.salaryList[0].amountDate,
      amount: this.salaryList[0].amount,
      isActive:this.salaryList[0].isActive,
      chequeNo:this.salaryList[0].chequeNo,
      description:this.salaryList[0].description
    });
  
  }
}

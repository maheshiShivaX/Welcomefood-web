import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth.service';
import { HttpService } from 'src/app/_services/http.service';
import { environment } from 'src/app/environments/environment.prod';



@Component({
  selector: 'app-otherincome',
  templateUrl: './otherincome.component.html',
  styleUrls: ['./otherincome.component.scss']
})
export class OtherincomeComponent {


  entryDate:any;
  selectedOption:any;
  companyId:any;

  constructor(private router: Router, private authService: AuthService, private route: ActivatedRoute,
    private http: HttpService, private toastr: ToastrService) {
    this.entryDate = new Date().toISOString().split('T')[0];
    this.selectedOption = 1;

    this.authService.currentUser.subscribe((user) => {
      const currentUser = user;
      // this.formExpense.value.createdBy = currentUser.loginId;
      this.companyId = currentUser.companyId;
    });
  }

public form = new FormGroup({
  incomeId: new FormControl(0),
  incomeTypeId: new FormControl(0),
  storeId: new FormControl(0),
  payModeId: new FormControl(0),
  amountDate: new FormControl(''),
  amount: new FormControl(0),
  isActive: new FormControl(true),
  createdBy: new FormControl(0),
  chequeNo: new FormControl(''),
});




storeid:any;
incometypelist:any

ngOnInit() {
  this.storeid = localStorage.getItem("storeid");
 this. GetPayMode() ;
  this.GetOtherIncomebyStoreId(this.storeid, this.entryDate);
  this.GetIncomeTypeByCompanyId(this.companyId);
}


GetIncomeTypeByCompanyId(companyid:any) {
  this.http.getAll(environment.GetIncomeTypeByCompanyId+"?pCompanyId="+companyid).subscribe((result: any) => {
    if (result.isSuccess == 1) {
      console.log(result.data)
      this.incometypelist = result.data;
    }
    else { 
      // this.products = null;
    }
  })
}


otherincomelist:any;
GetOtherIncomebyStoreId( pStoreId: any , pAmountDate:any) {
    this.http.getAll(environment.GetOtherIncomebyStoreId + "?pStoreId=" + this.storeid+ "&pAmountDate="+ pAmountDate ).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        console.log(result.data)
        this.otherincomelist = result.data;
      }
      else {
        this.otherincomelist = null;
      }
    })
  }
  

  DeleteOtherIncomeById( pOtherIncomeId: any) {
    this.http.getAll(environment.DeleteOtherIncomeById + "?pOtherIncomeId=" + pOtherIncomeId ).subscribe((result: any) => {
      if (result.isSuccess == 1) {
  
        this.GetOtherIncomebyStoreId(this.storeid, this.entryDate);
      }
      else {
        //this.salarytransaction = null;
      }
    })
  }


  paymode:any;
  GetPayMode() {

    this.http.getAll(environment.GetPayMode  ).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        console.log(result.data)
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
    if (this.form.value.amount == 0) {

      this.toastr.error('Please enter valid amount')
      return;
    }

    console.log(this.form.value);
    if (this.form.invalid) {

      return;
    }

    this.http.post(environment.SaveOtherIncome, this.form.value).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        this.GetOtherIncomebyStoreId(this.storeid, this.entryDate);
        
        this.onReset();
        this.toastr.success(result.message);
      }
      else {
        console.log(result);
        this.toastr.error(result.message);
      }
    });
  }
  onReset()
  {
    this.form.patchValue({
      incomeTypeId: 0,
      storeId: 0,
      incomeId: 0,
      payModeId: 0,
      amountDate:'',
      amount: 0,
      isActive:true,
      chequeNo:''
    });
  }
salaryList:any;

  onedit(pid:any)
  {
    this.salaryList = this.otherincomelist.filter((x: {incomeId: any; }) => x.incomeId == pid);

    this.form.patchValue({
      incomeId: this.salaryList[0].incomeId,
      storeId: this.salaryList[0].storeId,
      incomeTypeId: this.salaryList[0].incomeTypeId,
      payModeId: this.salaryList[0].payModeId,
      amountDate: this.salaryList[0].amountDate,
      amount: this.salaryList[0].amount,
      isActive:this.salaryList[0].isActive,
      chequeNo:this.salaryList[0].chequeNo
    });
  
  }
}



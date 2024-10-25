import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth.service';
import { HttpService } from 'src/app/_services/http.service';
import { environment } from 'src/app/environments/environment.prod';


@Component({
  selector: 'app-taxcollection',
  templateUrl: './taxcollection.component.html',
  styleUrls: ['./taxcollection.component.scss']
})
export class TaxcollectionComponent {

  @Input() storesdata: { storeid: string; fromdate: string, todate :string }[] = [];
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
  taxDetailId: new FormControl(0),
  taxTypeId: new FormControl(0),
  storeId: new FormControl(0),
  description:new FormControl(''),
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

     // alert('asdf');
     this.storeid =this.storesdata[0].storeid;// localStorage.getItem("storeid");
     //this.tstoreid =this.storesdata[0].storeid;// localStorage.getItem("tStoreId");
     this.entryDate = this.storesdata[0].fromdate; //localStorage.getItem("tfromdate");
    
     
 this. GetPayMode() ;
  this.GetOtherIncomebyStoreId(this.storeid, this.entryDate);
  this.GetIncomeTypeByCompanyId(this.companyId);
}


GetIncomeTypeByCompanyId(companyid:any) {
  this.http.getAll(environment.GetTaxTypeByCompanyId+"?pCompanyId="+companyid).subscribe((result: any) => {
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
    this.http.getAll(environment.GetTaxDetailByStoreId + "?pStoreId=" + this.storeid+ "&pAmountDate="+ pAmountDate ).subscribe((result: any) => {
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
    this.http.getAll(environment.DeleteTaxDetailById + "?pTaxDetailId=" + pOtherIncomeId ).subscribe((result: any) => {
      if (result.isSuccess == 1) {
  
        this.GetOtherIncomebyStoreId(this.storeid, this.entryDate);
        this.toastr.success(result.message);
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
        this.paymode = result.data.filter((x: { payModeId: number; })=>x.payModeId==1);
 
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

    this.http.post(environment.SaveTaxDetail, this.form.value).subscribe((result: any) => {
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
      taxDetailId: 0,
      storeId: 0,
      taxTypeId: 0,
      description:'',
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
    this.salaryList = this.otherincomelist.filter((x: {taxDetailId: any; }) => x.taxDetailId == pid);

    this.form.patchValue({
      taxTypeId: this.salaryList[0].taxTypeId,
      storeId: this.salaryList[0].storeId,
      taxDetailId: this.salaryList[0].taxDetailId,
      payModeId: this.salaryList[0].payModeId,
      amountDate: this.salaryList[0].amountDate,
      amount: this.salaryList[0].amount,
      isActive:this.salaryList[0].isActive,
      chequeNo:this.salaryList[0].chequeNo,
      description:this.salaryList[0].description,
    });
  
  }
}



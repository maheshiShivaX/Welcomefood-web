import { Component, Input } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth.service';
import { HttpService } from 'src/app/_services/http.service';
import { environment } from 'src/app/environments/environment.prod';


@Component({
  selector: 'app-cashreconcil',
  templateUrl: './cashreconcil.component.html',
  styleUrls: ['./cashreconcil.component.scss']
})
export class CashreconcilComponent {
  @Input() storesdata: { storeid: string; fromdate: string, todate :string }[] = [];
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

  storeid: any;
  showCreditCardInput: boolean = true;
  showStoreInput: boolean = false;
  showLotteryInput: boolean = false;
  showArcadeInput: boolean = false;
  showOtherInput: boolean = false;
  showPayrollInput: boolean = false;
  showDailysaleInput: boolean = true;
  showGasInput: boolean = false;
  showPurchasesInput: boolean = false;
  showExpensesInput: boolean = false;
  activeButtonIndex: number | null = 0;
  selectedOption: any;
  entryDate: any;
  expenseitem: any;
  expenseitemdetail: any;
  selectedRowsitems: any[] = [];
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

  companyId:any;


  public form = new FormGroup({
    cashReconcilId: new FormControl(0),
    storeId: new FormControl(0),
    recipient: new FormControl(''),
    paymentType: new FormControl(0),
    amount: new FormControl(''),
    amountDate: new FormControl(''),
    isActive: new FormControl(true),
    createdBy: new FormControl(0),
  });

  paymentOptions: { label: string; value: number }[] = [
    { label: 'Inward', value: 1 },
    { label: 'Outward', value: 2 }
  ];


  expense: any;

  onedit(pid: any) {
    this.expense = this.casereconcil.filter((x: { cashReconcilId: any; }) => x.cashReconcilId == pid);

    this.form.patchValue({
      storeId: this.expense[0].storeid, 
      cashReconcilId: this.expense[0].cashReconcilId,
      recipient: this.expense[0].recipient,
      paymentType: this.expense[0].paymentType,
      amountDate: this.expense[0].amountDate,
      amount: this.expense[0].amount,
     
    });
  }

  onDelete(pid:any)
  {
    this.http.getAll(environment.DeleteCashReconcilById + "?pCashReconcilId=" + pid ).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        console.log(result.data)
        this.GetCashReconcilByStoreId()
      }
      else {
        this.expenseitem = null;
      }
    })
  }

  onPayModeChange(pid: any) {
    if (this.expenseitem != null) {

      this.expenseitemdetail = this.expenseitem.filter((x: { payModeId: any; }) => x.payModeId == +pid)
    }
  }

  expenseitemlist:any;
  casereconcil:any;
  GetCashReconcilByStoreId() {
    this.http.getAll(environment.GetCashReconcilByStoreId +"?pStoreId=" + this.storeid + "&pAmountDate=" + this.entryDate  ).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        console.log(result.data)
        this.casereconcil = result.data;
      }
      else {
        this.casereconcil = null;
      }
    })
  }

  expenseiteslist: any
  GetExpenseItemsById(pGroupId: any) {
    this.http.getAll(environment.GetExpenseItemsById + "?pStoreId=" + this.storeid + "&pExpenseGroupId=" + pGroupId + "&pAmountDate=" + this.entryDate).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        console.log(result.data)
        this.expenseiteslist = result.data;

      }
      else {
        this.expenseiteslist = null;
      }
    })
  }



  ngOnInit() {
 
    this.storeid =this.storesdata[0].storeid;// localStorage.getItem("storeid");
    //this.tstoreid =this.storesdata[0].storeid;// localStorage.getItem("tStoreId");
    this.entryDate = this.storesdata[0].fromdate; //localStorage.getItem("tfromdate");
    this.  GetCashReconcilByStoreId();
   // this.showexpensesData(0,'Expense')
   
  }




  showtopData(pid: any) {
    // alert(pid)
    this.showDailysaleInput = false;
    this.showGasInput = false;
    this.showPurchasesInput = false;
    this.showExpensesInput = false;
    if (pid == 0) {
      this.showDailysaleInput = true;
    }
    else if (pid == 1) {
      this.showGasInput = true;
    }
    else if (pid == 2) {
      this.showPurchasesInput = true;
    }
    else {
      this.showExpensesInput = true;
    }
  }

  cashData: any[] = [/* Your cash data array */];
  activeIndex: number | null = 0;

  toggleActive(index: number): void {
    this.activeIndex = index === this.activeIndex ? null : index;
  }



  groupId: any;
  categoryId: any;

 


  onSubmitCredit() {


    this.form.patchValue({
      storeId: this.storeid,
      amountDate: this.entryDate,
    });
    if (this.form.value.amount == '') {

      this.toastr.error('Please enter valid amount')
      return;
    }

    console.log(this.form.value);
    if (this.form.invalid) {

      return;
    }

    this.http.post(environment.SaveCashReconcil, this.form.value).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        this.GetCashReconcilByStoreId();
        this.onReset();
        this.toastr.success(result.message);
      }
      else {
        console.log(result);
        this.toastr.error(result.message);
      }
    });
  }


 
  onReset() {
    this.form.patchValue({
      cashReconcilId: 0,
      storeId: 0,
      recipient: '',
      paymentType: 0,
      amountDate: '',
      amount: '',
      isActive: true,
  createdBy: 0,
    });
  }

 


}

import { Component, Input } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/_services/auth.service';
import { HttpService } from 'src/app/_services/http.service';
import { TriggerdailyService } from 'src/app/_services/triggerdaily.service';
import { environment } from 'src/app/environments/environment.prod';


@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss']
})
export class ExpenseComponent {
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
  private dataChangeSubscription: Subscription;
  constructor(private router: Router, private authService: AuthService, private route: ActivatedRoute,
    private http: HttpService, private toastr: ToastrService,private dataService: TriggerdailyService,) {
    this.entryDate = new Date().toISOString().split('T')[0];
    this.selectedOption = 1;

    this.authService.currentUser.subscribe((user) => {
      const currentUser = user;
      // this.formExpense.value.createdBy = currentUser.loginId;
      this.companyId = currentUser.companyId;
     
    });

    this.dataChangeSubscription = this.dataService.dataChange$.subscribe((menutype: any) => {
      console.log('Menu type changed to:', menutype);
      if(menutype=='3')
      {
        this.storeid =localStorage.getItem("storeid");
        this.entryDate =localStorage.getItem("tentrydate") 

     this.GetPayMode();this. GetExpenseGroupByCompanyId();
  

      }
      
    });

  }

  public formExpense = new FormGroup({

    payMode: new FormControl(0),
    storeId: new FormControl(1),
    amountDate: new FormControl(1),
    itemDetailDtos: new FormArray(this.selectedRowsitems),
  });


  public formcradit = new FormGroup({
    expenseItemId: new FormControl(0),
    expenseGroupId: new FormControl(0),
    expenseCategoryId: new FormControl(0),
    payModeId: new FormControl(0),
    storeId: new FormControl(1),
    amountDate: new FormControl(''),
    amount: new FormControl(''),
    description: new FormControl(''),
    isActive: new FormControl(true),
    createdBy: new FormControl(0),
    chequeNo:new FormControl('')
  });




  expense: any;

  onedit(pid: any) {
    this.expense = this.expenseitemlist.filter((x: { expenseItemId: any; }) => x.expenseItemId == pid);

    this.formcradit.patchValue({
      storeId: this.storeid,
      expenseGroupId: this.groupId,
      expenseCategoryId: this.expense[0].expenseCategoryId,
      payModeId: this.expense[0].payModeId,
      amountDate: this.expense[0].amountDate,
      amount: this.expense[0].amount,
      description: this.expense[0].description,
      expenseItemId: this.expense[0].expenseItemId,
      chequeNo:this.expense[0].chequeNo
    });

  }

  onPayModeChange(pid: any) {
    if (this.expenseitem != null) {

      this.expenseitemdetail = this.expenseitem.filter((x: { payModeId: any; }) => x.payModeId == +pid)
    }
  }

  expenseitemlist:any;

  GetExpenseItemsByAmountDate( pGroupId: any) {
    this.http.getAll(environment.GetExpenseItemsByAmountDateGroup + "?pStoreId=" + this.storeid + "&pExpenseGroupId=" + pGroupId + "&pAmountDate=" + this.entryDate).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        console.log(result.data)
        this.expenseitemlist = result.data;
      }
      else {
        this.expenseitem = null;
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
 
    
       // alert('asdf');
       this.storeid =this.storesdata[0].storeid;// localStorage.getItem("storeid");
       //this.tstoreid =this.storesdata[0].storeid;// localStorage.getItem("tStoreId");
       this.entryDate = this.storesdata[0].fromdate; //localStorage.getItem("tfromdate");
       //this

   // this.storeid = localStorage.getItem("storeid");
    this.GetPayMode();this. GetExpenseGroupByCompanyId();
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

  groupname:any;
  showexpensesData(peid: any, typeid:any) {

    //alert(peid);
    if(typeid='Expense')
    {
      if(this.expensegrouplist !=null)
        {
          this.groupname= this.expensegrouplist.filter((x: { expenseGroupId: any; })=>x.expenseGroupId== peid)[0].expenseGroupName
    
           this.GetExpenseCategoryByGroupId(peid);
        }
    }else
    {

    }
    


  }

  groupId: any;
  categoryId: any;

 


  onSubmitCredit() {


    this.formcradit.patchValue({
      storeId: this.storeid,
      expenseGroupId: this.groupId,
     // expenseCategoryId: this.categoryId,
     // payModeId: 1,
      amountDate: this.entryDate,
    });
    if (this.formcradit.value.amount == '') {

      this.toastr.error('Please enter valid amount')
      return;
    }

    console.log(this.formcradit.value);
    if (this.formcradit.invalid) {

      return;
    }

    this.http.post(environment.SaveExpenseItem, this.formcradit.value).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        this.GetExpenseItemsById(this.groupId);
        this.GetExpenseItemsByAmountDate(this.groupId);
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
    this.formcradit.patchValue({
      storeId: 0,
      expenseGroupId: 0,
      expenseCategoryId: 0,
      payModeId: 0,
      amountDate: '',
      description: '',
      amount: '',
      chequeNo:'',
      expenseItemId:0
    });
  }
  expensegrouplist: any;
  companyId: any;
  GetExpenseGroupByCompanyId() {
    console.log('companyid' ,this.companyId)
    this.http.getAll(environment.GetExpenseGroupByCompanyId + "?pCompanyId=" + this.companyId).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        console.log('asd', result.data)
        this.expensegrouplist = result.data;
    this.showexpensesData( this.expensegrouplist[0].expenseGroupId,'Expense');

      }
      else {
        // this.products = null;
      }
    })
  }
  


  

  GetExpenseCategoryByGroupId(pid: any) {
    this.groupId= pid;
    this.http.getAll(environment.GetExpenseCategoryByGroupId + "?pExpenseGroupId=" + pid ).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        console.log(result.data)
        this.expenseitem = result.data;
       // this.onPayModeChange(pid);
        this.GetExpenseItemsByAmountDate(pid); 
      }
      else {
        this.expenseitem = null;
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


}

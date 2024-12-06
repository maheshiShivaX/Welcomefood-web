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

  entryDate: any;
  expenseitem: any;
  private dataChangeSubscription: Subscription;
  constructor(private router: Router, private authService: AuthService, private route: ActivatedRoute,
    private http: HttpService, private toastr: ToastrService,private dataService: TriggerdailyService,) {
    this.entryDate = new Date().toISOString().split('T')[0];
   

    this.authService.currentUser.subscribe((user) => {
      const currentUser = user;
      // this.formExpense.value.createdBy = currentUser.loginId;
      this.companyId = currentUser.companyId;
     
    });

    this.dataChangeSubscription = this.dataService.dataChange$.subscribe((menutype: any) => {
   
      if(menutype=='3')
      {
        this.storeid =localStorage.getItem("storeid");
        this.entryDate =localStorage.getItem("tentrydate") 

     this.GetPayMode();this.GetExpenseCategoryByGroupId();
     this. GetExpenseItemsByAmountDate( );
  

      }
      
    });

  }



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
      expenseGroupId:2,
      expenseCategoryId: this.expense[0].expenseCategoryId,
      payModeId: this.expense[0].payModeId,
      amountDate: this.expense[0].amountDate,
      amount: this.expense[0].amount,
      description: this.expense[0].description,
      expenseItemId: this.expense[0].expenseItemId,
      chequeNo:this.expense[0].chequeNo
    });

  }


  expenseitemlist:any;

  GetExpenseItemsByAmountDate( ) {
    this.http.getAll(environment.GetExpenseItemsBydate + "?pStoreId=" + this.storeid + "&pAmountDate=" + this.entryDate).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        
        this.expenseitemlist = result.data;
      }
      else {
        this.expenseitemlist = null;
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
    this.GetPayMode();this.GetExpenseCategoryByGroupId();
    this. GetExpenseItemsByAmountDate( );
   // this.showexpensesData(0,'Expense')
   
  }
  selectedOption:any=1;


  onPaymodechange(id:any)
  {
this.selectedOption=id;
  }





  SaveExpenseItem() {


    this.formcradit.patchValue({
      storeId: this.storeid,
      expenseGroupId: 2,
      amountDate: this.entryDate,
    });
    if (this.formcradit.value.amount == '') {

      this.toastr.error('Please enter valid amount')
      return;
    }

  
    if (this.formcradit.invalid) {

      return;
    }
console.log(this.formcradit.value);
    this.http.post(environment.SaveExpenseItem, this.formcradit.value).subscribe((result: any) => {
      if (result.isSuccess == 1) {

        this.GetExpenseItemsByAmountDate();
        this.onReset();
        this.toastr.success(result.message);
      }
      else {
    
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

  

  ondelete( pExpenseItemId: any) {
    this.http.getAll(environment.DeleteExpenseItemById + "?pExpenseItemId=" + pExpenseItemId ).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        this.GetExpenseItemsByAmountDate( );
        this.toastr.success(result.message);
      }
      else {
        this.expenseitemlist = null;
      }
    })
  }
  
  GetExpenseCategoryByGroupId() {
    this.http.getAll(environment.GetExpenseCategoryByGroupId + "?pExpenseGroupId=" + 2 ).subscribe((result: any) => {
      if (result.isSuccess == 1) {

        this.expenseitem = result.data;
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
        
        this.paymode = result.data;
 
      }
      else {
        this.paymode = null;
      }
    })
  }


}

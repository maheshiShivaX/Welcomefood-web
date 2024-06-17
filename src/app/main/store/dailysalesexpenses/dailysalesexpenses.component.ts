import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth.service';
import { HttpService } from 'src/app/_services/http.service';
import { environment } from 'src/app/environments/environment.prod';

@Component({
  selector: 'app-dailysalesexpenses',
  templateUrl: './dailysalesexpenses.component.html',
  styleUrls: ['./dailysalesexpenses.component.scss']
})
export class DailysalesexpensesComponent {
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
  }

  public formExpense = new FormGroup({

    payMode: new FormControl(1),
    storeId: new FormControl(1),
    amountDate: new FormControl(1),
    itemDetailDtos: new FormArray(this.selectedRowsitems),
  });


  public formcradit = new FormGroup({
    expenseItemId: new FormControl(0),
    expenseGroupId: new FormControl(0),
    expenseCategoryId: new FormControl(0),
    payModeId: new FormControl(1),
    storeId: new FormControl(1),
    amountDate: new FormControl(''),
    amount: new FormControl(0),
    description: new FormControl(''),
    isActive: new FormControl(true),
    createdBy: new FormControl(0),
  });

  expense:any;

  onedit(pid:any)
  {
   this.expense=  this.expenseiteslist.filter((x: { expenseItemId: any; })=>x.expenseItemId==pid);

    this.formcradit.patchValue({
      storeId: this.storeid,
      expenseGroupId: this.groupId,
      expenseCategoryId: this.expense[0].expenseCategoryId,
      payModeId: this.expense[0].payModeId,
      amountDate:this.expense[0].amountDate,
      amount:this.expense[0].amount,
      description:this.expense[0].description,
      expenseItemId:this.expense[0].expenseItemId,
    });

  }

  onPayModeChange(pid: any) {
    if (this.expenseitem != null) {

      this.expenseitemdetail = this.expenseitem.filter((x: { payModeId: any; }) => x.payModeId == +pid)
    }
  }

  GetExpenseItemsByAmountDate(pid: any, pGroupId: any) {
    this.http.getAll(environment.GetExpenseItemsByAmountDate + "?pStoreId=" + this.storeid + "&pExpenseGroupId=" + pGroupId + "&pAmountDate=" + this.entryDate).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        console.log(result.data)
        this.expenseitem = result.data;
        this.onPayModeChange(pid);
      }
      else {
        this.expenseitem = null;
      }
    })
  }

  expenseiteslist:any
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
    this.storeid = localStorage.getItem("storeid");
    this.showexpensesData(0)
    // this.GetExpenseItemsByAmountDate();
  }


  videoslide: any = {
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    loop: false,
    autoplay: false,
    center: false,
    dots: false,
    autoHeight: false,
    autoWidth: false,
    navSpeed: 700,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      640: {
        items: 3
      },
      768: {
        items: 3
      },
      992: {
        items: 4
      },
      1200: {
        items: 5
      },
      1400: {
        items: 6
      }

    },
    nav: false,
    innerWidth: 200,
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

  showexpensesData(peid: any) {
    // alert(pid)
    this.showCreditCardInput = false;
    this.showStoreInput = false;
    this.showLotteryInput = false;
    this.showArcadeInput = false;
    this.showOtherInput = false;
    this.showPayrollInput = false;
    if (peid == 0) {
      this.showCreditCardInput = true;

      this.groupId = 1;
      this.categoryId = 1;
      this.GetExpenseItemsById(this.groupId);
    }
    else if (peid == 1) {
      this.showStoreInput = true;

      this.storeexpense();

    }
    else if (peid == 2) {
      this.showLotteryInput = true;
      this.storelottery();
    }
    else if (peid == 3) {
      this.showArcadeInput = true;
      this.storeArcad();
    }
    else if (peid == 4) {
      this.showOtherInput = true;
      this.storeOther();
    }
    else {
      this.showPayrollInput = true;
      this.selectedOption = "1";
      this.groupId = 5;
      this.categoryId = 19;
      this.GetExpenseItemsById(this.groupId);
    }
  }

  groupId: any;
  categoryId: any;

  storeexpense() {
    this.selectedOption = "1";
    this.GetExpenseItemsByAmountDate(this.selectedOption, 2);


  }
  storelottery() {
    this.selectedOption = "1";
    this.GetExpenseItemsByAmountDate(this.selectedOption, 3);
  }

  storeArcad() {
    this.selectedOption = "1";
    this.GetExpenseItemsByAmountDate(this.selectedOption, 6);
  }

  storeOther() {
    this.selectedOption = "1";
    this.GetExpenseItemsByAmountDate(this.selectedOption, 4);
  }


  onExpeseSave() {
    this.selectedRowsitems = this.expenseitemdetail
    this.formExpense.patchValue({
      storeId: +this.storeid,
      amountDate: this.entryDate,
      itemDetailDtos: this.selectedRowsitems,
      payMode: this.selectedOption,
    })
    this.formExpense.value.itemDetailDtos = this.selectedRowsitems;
    console.log(this.formExpense.value);
    if (this.formExpense.invalid) {

      return;
    }
    this.http.post(environment.SaveExpenseItems, this.formExpense.value).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        console.log(result);
        this.toastr.success(result.message);
        this.GetExpenseItemsByAmountDate(this.selectedOption, this.formExpense.value.itemDetailDtos[0].expenseGroupId);
      }
      else {

        console.log(result);
        this.toastr.error(result.message);
      }
    });
  }

  onSubmitCredit() {


    this.formcradit.patchValue({
      storeId: this.storeid,
      expenseGroupId: this.groupId,
      expenseCategoryId: this.categoryId,
      payModeId: 1,
      amountDate: this.entryDate,
    });
    if (this.formcradit.value.amount == 0) {

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
        this.onReset();
        this.toastr.success(result.message);
      }
      else {
        console.log(result);
        this.toastr.error(result.message);
      }
    });
  }


  onSubmitPayrols() {


    this.formcradit.patchValue({
      storeId: this.storeid,
      expenseGroupId: this.groupId,
      expenseCategoryId: this.categoryId,
      amountDate: this.entryDate,
    });
    if (this.formcradit.value.amount == 0) {

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
      payModeId: 1,
      amountDate: '',
      description: '',
      amount: 0
    });
  }
}

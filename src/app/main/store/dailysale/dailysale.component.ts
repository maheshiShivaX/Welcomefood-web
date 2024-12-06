import { Component, HostListener, SimpleChanges, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth.service';
import { HttpService } from 'src/app/_services/http.service';
import { environment } from 'src/app/environments/environment.prod';
import { LotteryComponent } from '../lottery/lottery.component';
import { TriggerdailyService } from 'src/app/_services/triggerdaily.service';
import { Subscription } from 'rxjs';

interface InventoryItem {
  name: string;
  regular: number;
  plus: number;
  premium: number;
  diesel: number;
  total: number;
}

@Component({
  selector: 'app-dailysale',
  templateUrl: './dailysale.component.html',
  styleUrls: ['./dailysale.component.scss']
})
export class DailysaleComponent {


  storesdata = [
    { storeid: 'Job', fromdate: 'fdg', todate: 'dfg' }
  ];





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


  //today: string;
  insideList: any
  storeId: any;
  entryDate: any;
  otherList: any;
  storedata: any;
  insidesaleamount: any = 0;
  outsidesaleamount: any = 0;
  totalsaleamount: any = 0;
  showpayroll: boolean = false;
  showrebate: boolean = false;
  showDailysaleInput: boolean = true;
  showClosingInput: boolean = false;
  showGasInput: boolean = false;
  showPurchasesInput: boolean = false;
  showExpensesnewInput: boolean = false;
  activeButtonIndex: number | null = 0;
  vendorList: any;
  productlist: any;
  productcategorylist: any;
  purchaseitemlist: any;
  private dataChangeSubscription: Subscription;
  constructor(private router: Router, private authService: AuthService, private route: ActivatedRoute, private dataService: TriggerdailyService,
    private http: HttpService, private toastr: ToastrService,) {
    this.entryDate = new Date().toISOString().split('T')[0];

    this.dated = this.entryDate;


    this.dataChangeSubscription = this.dataService.dataChange$.subscribe((menutype: any) => {

      if (menutype == '0') {
        this.storeId = localStorage.getItem("storeid");
        this.entryDate = localStorage.getItem("tentrydate")
        this.dated = this.entryDate;
        this.GetStoreDetailAll(this.storeId)
        this.GetInsideSale(this.storeId, 1, this.entryDate);
        this.GetOtherSale(this.storeId, 1, this.entryDate);

        this.GetAmountByGroupId(this.storeId, this.entryDate)
      }

    });

  }
  showtaps: boolean = false;

  onDateChange(event: any) {

    const input = event.target as HTMLInputElement;
    //this.dated = new Date(input.value);
    this.entryDate = new Date(input.value).toISOString().split('T')[0];


    this.storeId = this.route.snapshot.params["storeId"];
    localStorage.setItem("storeid", this.storeId);
    localStorage.setItem("tentrydate", this.entryDate);
    localStorage.setItem("tlastdate", this.entryDate);

    this.dataService.triggerDataChange(this.activetab);
    this.dated = this.entryDate;
    this.showData(this.activetab);

  }

  storedetail: any;
  GetStoreDetailAll(storeId: any) {
    this.http.getAll(environment.GetStoreDetail).subscribe((result: any) => {
      if (result.isSuccess == 1) {

        this.storedetail = result.data.filter((x: { storeId: any; }) => x.storeId == storeId);
      }
      else {
        this.storedetail = null;
      }
    })
  }

  onBack() {
    this.router.navigateByUrl('/store/mystore');
  }

  ngOnInit() {
    this.storeId = this.route.snapshot.params["storeId"];
    localStorage.setItem("storeid", this.storeId);

    this.dated = this.entryDate;
    this.GetStoreDetailAll(this.storeId)
    this.GetInsideSale(this.storeId, 1, this.entryDate);
    this.GetOtherSale(this.storeId, 1, this.entryDate);
    this.GetGetStoreClosingByStoreId(this.storeId, this.entryDate);
    this.GetAmountByGroupId(this.storeId, this.entryDate)
    this.GetCreditCardByStoreIdDate();
  }





  onother() {
    this.isView = false;
  }
  showCreditcardinput: boolean = false;
  lotterytype: any
  lotteryamount: any;
  lotteryamountExpense: any;
  lotterytypeExpense: any;

  GetLotteryTypeStoreIdDate() {
    this.http.getAll(environment.GetLotteryTypeStoreIdDate + "?pStoreId=" + this.storeId + "&pAmountDate=" + this.entryDate).subscribe((result: any) => {
      if (result.isSuccess == 1) {

        this.lotterytype = result.data;


        this.lotteryamount = this.lotterytype.reduce((acc: any, item: { lotteryAmount: any; }) => acc + (item.lotteryAmount || 0), 0);


      }
      else {
        this.lotterytype = null;
      }
    })
  }
  GetLotteryExpenseStoreIdDate() {
    this.http.getAll(environment.GetLotteryExpenseStoreIdDate + "?pStoreId=" + this.storeId + "&pAmountDate=" + this.entryDate).subscribe((result: any) => {
      if (result.isSuccess == 1) {

        this.lotterytypeExpense = result.data;


        this.lotteryamountExpense = this.lotterytypeExpense.reduce((acc: any, item: { lotteryAmount: any; }) => acc + (item.lotteryAmount || 0), 0);


      }
      else {
        this.lotterytype = null;
      }
    })
  }





  expenseitem: any;

  GetExpenseItemsByAmountDate() {
    this.http.getAll(environment.GetExpenseItemsByAmountDate + "?pStoreId=" + this.storeId + "&pExpenseGroupId=" + 2 + "&pAmountDate=" + this.entryDate).subscribe((result: any) => {
      if (result.isSuccess == 1) {

        this.expenseitem = result.data;
      }
      else {
        this.expenseitem = null;
      }
    })
  }


  GetAmountByGroupId(pStoreId: any, pAmountDate: any) {

    this.http.getAll(environment.GetAmountByGroupId + "?pStoreId=" + pStoreId + "&pAmountDate=" + pAmountDate).subscribe((result: any) => {
      if (result.isSuccess == 1) {

        this.storedata = result.data;
        this.insidesaleamount = this.storedata.filter((x: { productGroupId: number; }) => x.productGroupId == 1)[0].amount;
        this.outsidesaleamount = this.storedata.filter((x: { productGroupId: number; }) => x.productGroupId != 1).reduce((acc: any, item: { amount: any; }) => acc + (item.amount || 0), 0);
        this.totalsaleamount = this.storedata.reduce((acc: any, item: { amount: any; }) => acc + (item.amount || 0), 0);
      }
      else {
        // this.insideList = null;
      }
    })
  }
  closingdata: any;
  GetGetStoreClosingByStoreId(pStoreId: any, pAmountDate: any) {

    this.http.getAll(environment.GetStoreClosingByStoreId + "?pStoreId=" + pStoreId + "&pAmountDate=" + pAmountDate).subscribe((result: any) => {
      if (result.isSuccess == 1) {

        this.closingdata = result.data;
        this.storeclosingcash = this.closingdata[0].amount;

      }
      else {
        // this.insideList = null;
      }
    })
  }




  GetInsideSale(pStoreId: any, pGroupId: any, pEntryDate: any) {

    this.http.getAll(environment.GetInsideSale + "?pStoreId=" + pStoreId + "&pGroupId=" + pGroupId + "&pEntryDate=" + pEntryDate).subscribe((result: any) => {
      if (result.isSuccess == 1) {

        this.insideList = result.data;
      }
      else {
        this.insideList = null;
      }
    })
  }
  GetOtherSale(pStoreId: any, pGroupId: any, pEntryDate: any) {

    this.http.getAll(environment.GetOtherSale + "?pStoreId=" + pStoreId + "&pGroupId=" + pGroupId + "&pEntryDate=" + pEntryDate).subscribe((result: any) => {
      if (result.isSuccess == 1) {

        this.otherList = result.data;
      }
      else {
        this.otherList = null;
      }
    })
  }
  isView: boolean = false;

  onTextboxLeave(event: Event, row: any): void {





    const inputElement = event.target as HTMLInputElement;
    if (inputElement.value && !inputElement.value.includes('.')) {
      inputElement.value = inputElement.value + '.00';
    }
    if (inputElement.value == '' || inputElement.value == '0') {

      this.http.getAll(environment.PDeleteItemSaleById + "?pStoreId=" + this.storeId + "&pAmountDate=" + this.entryDate + "&pProductId=" + row.productId).subscribe((result: any) => {
        if (result.isSuccess == 1) {

          this.GetAmountByGroupId(this.storeId, this.entryDate);
        }
        else {
          this.GetAmountByGroupId(this.storeId, this.entryDate);
        }
      })

    } else {
      this.form.patchValue({
        storeId: this.storeId,
        amountDate: this.entryDate,
        payMode: 1,
        productCategoryId: row.productCategoryId,
        productId: row.productId,
        amount: inputElement.value,
        isActive: true,
        createdBy: 0,
      })
      this.onSubmit();
    }


    // Add your logic here
  }


  onTextboxCreditLeave(event: Event, row: any): void {





    const inputElement = event.target as HTMLInputElement;




    this.formCreditcard.patchValue({
      storeId: this.storeId,
      amountDate: this.entryDate,
      amount: inputElement.value,
      creditCardId: row.creditCardId,
      isActive: true,
      createdBy: 0,
    })
    this.onSubmitCreditCard();
    // Add your logic here
  }



  onTextboxLotteryLeave(event: Event, row: any): void {





    const inputElement = event.target as HTMLInputElement;




    this.formLottery.patchValue({
      storeId: this.storeId,
      amountDate: this.entryDate,
      lotteryAmount: inputElement.value,
      lotteryTypeId: row.lotteryTypeId,
      isActive: true,
      createdBy: 0,
    })
    this.onSubmitLottery();
    // Add your logic here
  }



  creditcardamount: any;
  creditcardlist: any;
  GetCreditCardByStoreIdDate() {

    this.http.getAll(environment.GetCreditCardByStoreIdDate + "?pStoreId=" + this.storeId + "&pAmountDate=" + this.entryDate).subscribe((result: any) => {
      if (result.isSuccess == 1) {

        this.creditcardlist = result.data;

        this.creditcardamount = this.creditcardlist.reduce((acc: any, item: { amount: any; }) => acc + (item.amount || 0), 0);


      }
      else {
        this.creditcardlist = null;
      }
    })
  }




  public form = new FormGroup({
    itemSaleId: new FormControl(0),
    productCategoryId: new FormControl(0, Validators.required),
    productId: new FormControl(0, Validators.required),
    payMode: new FormControl(1, Validators.required),
    amount: new FormControl('', Validators.required),
    amountDate: new FormControl('2024-05-08', Validators.required),
    isActive: new FormControl(true),
    createdBy: new FormControl(0),
    storeId: new FormControl(1),

  });


  public formCreditcard = new FormGroup({
    ccamountId: new FormControl(0),
    creditCardId: new FormControl(0, Validators.required),
    storeId: new FormControl(0, Validators.required),
    amount: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    amountDate: new FormControl('', Validators.required),
    isActive: new FormControl(true),
    createdBy: new FormControl(0),
  });


  public formLottery = new FormGroup({
    lotteryPayId: new FormControl(0),
    lotteryAmount: new FormControl('', Validators.required),
    storeId: new FormControl(0, Validators.required),
    lotteryTypeId: new FormControl(0, Validators.required),
    amountDate: new FormControl('', Validators.required),
    isActive: new FormControl(true),
    createdBy: new FormControl(0),
  });



  isLoading: boolean = false;
  submitted: boolean = false;
  groupId: any;
  onSubmit() {

    if (this.form.value.amount == '' || this.form.value.amount == '0') {
      return;
    }
    ;
    if (this.form.invalid) {
      this.isLoading = false;
      return;
    }
    this.http.post(environment.SaveItemSale, this.form.value).subscribe((result: any) => {
      if (result.isSuccess == 1) {

        ;
        this.storedata = result.data;
        this.insidesaleamount = this.storedata.filter((x: { productGroupId: number; }) => x.productGroupId == 1)[0].amount;
        this.outsidesaleamount = this.storedata.filter((x: { productGroupId: number; }) => x.productGroupId != 1).reduce((acc: any, item: { amount: any; }) => acc + (item.amount || 0), 0);
        // this.GetInsideSale(this.storeId, 1, this.entryDate);
        // this.GetOtherSale(this.storeId, 1, this.entryDate);

        // this.toastr.success(result.message);
      }
      else {
        //  this.toastr.error(result.message);
      }
    });
  }
  public formClosing = new FormGroup({
    closingCashId: new FormControl(0),
    storeId: new FormControl(0, Validators.required),
    amount: new FormControl('', Validators.required),
    amountDate: new FormControl('2024-05-08', Validators.required),
    isActive: new FormControl(true),
    createdBy: new FormControl(0),
  });

  onTextboxLeaveClosing(event: Event): void {
    const inputElement = event.target as HTMLInputElement;



    this.formClosing.patchValue({
      storeId: this.storeId,
      amountDate: this.entryDate,
      amount: inputElement.value,
      isActive: true,
      createdBy: 0,
    })
    this.onSubmitClosing();



    // Add your logic here
  }

  storeclosingdata: any;
  storeclosingcash: any;
  showSummaryInput: boolean = false;
  showCasereconcil: boolean = false;
  onSubmitClosing() {

    if (this.formClosing.value.amount == '' || this.formClosing.value.amount == '0') {
      return;
    }

    if (this.formClosing.invalid) {
      this.isLoading = false;
      return;
    }
    this.http.post(environment.StoreClosing, this.formClosing.value).subscribe((result: any) => {
      if (result.isSuccess == 1) {

        ;
        this.storeclosingdata = result.data;

        this.GetGetStoreClosingByStoreId(this.storeId, this.entryDate);
        // this.toastr.success(result.message);
      }
      else {
        //  this.toastr.error(result.message);
      }
    });
  }

  dated: any;
  showTaxCollection: boolean = false;
  showArcade: boolean = false
  showlottery: boolean = false;
  showOtherincome: boolean = false;
  activetab: any = 0;


  ngOnChanges(changes: SimpleChanges) {
    if (changes['storesdata']) {

      // Additional logic to handle the new data can go here
    }
  }
  showData(pid: any) {
    this.activetab = pid;
    //alert(pid)
    this.activetab = pid;
    this.showDailysaleInput = false;
    this.showGasInput = false;
    this.showPurchasesInput = false;
    this.showExpensesnewInput = false;
    this.showSummaryInput = false;
    this.showpayroll = false;
    this.showrebate = false;
    this.isView = false;
    this.showlottery = false;
    this.showOtherincome = false;
    this.showClosingInput = false;
    this.showCreditcardinput = false;
    this.showCasereconcil = false;
    this.showTaxCollection = false;
    this.showArcade = false;
    this.dated = this.entryDate;

    this.storesdata[0].storeid = this.storeId;
    this.storesdata[0].fromdate = this.dated;
    this.storesdata[0].todate = this.dated



    this.showtaps = true;

    if (pid == 0) {
      this.showDailysaleInput = true;
    }
    else if (pid == 1) {
      this.showGasInput = true;
    }
    else if (pid == 2) {
      this.showPurchasesInput = true;
    } else if (pid == 3) {
      this.showExpensesnewInput = true;
    } else if (pid == 4) {
      this.showpayroll = true;
    } else if (pid == 5) {
      this.showOtherincome = true;
    }
    else if (pid == 6) {
      this.showSummaryInput = true;

      this.dated = this.entryDate;

      this.storesdata[0].storeid = this.storeId;
      this.storesdata[0].fromdate = this.dated;
      this.storesdata[0].todate = this.dated

    }

    else if (pid == 7) {
      this.showrebate = true;
    }
    else if (pid == 8) {

      if (this.showlottery == false) {
        this.showlottery = true;
      } else {
        this.showlottery = false;
      }



    } else if (pid == 9) {
      this.showClosingInput = true;


      this.dated = this.entryDate;

      this.storesdata[0].storeid = this.storeId;
      this.storesdata[0].fromdate = this.dated;
      this.storesdata[0].todate = this.dated
    }
    else if (pid == 10) {
      this.showCreditcardinput = true;
    } else if (pid == 11) {
      this.showCasereconcil = true;
    }
    else if (pid == 12) {
      this.showTaxCollection = true;
    }
    else if (pid == 13) {
      this.showArcade = true;
    }
    else {
      alert("data not found")
    }
  }


  cashData: any[] = [/* Your cash data array */];
  activeIndex: number | null = null;

  toggleActive(index: number): void {
    this.activeIndex = index === this.activeIndex ? null : index;
  }









  creditcarddata: any;
  onSubmitCreditCard() {


    if (this.formCreditcard.value.amount == '' || this.formCreditcard.value.amount == '0') {
      return;
    }



    this.http.post(environment.SaveCreditCardDetail, this.formCreditcard.value).subscribe((result: any) => {
      if (result.isSuccess == 1) {

        ;
        this.creditcarddata = result.data;

        this.GetCreditCardByStoreIdDate();

      }
      else {
        //  this.toastr.error(result.message);
      }
    });
  }


  onSubmitLottery() {


    if (this.formLottery.value.lotteryAmount == '' || this.formLottery.value.lotteryAmount == '0') {
      return;
    }



    this.http.post(environment.SaveLotteryPayDetail, this.formLottery.value).subscribe((result: any) => {
      if (result.isSuccess == 1) {

        ;
        // this.lotterytype = result.data;




        this.GetLotteryTypeStoreIdDate();
        this.GetLotteryExpenseStoreIdDate();

      }
      else {
        //  this.toastr.error(result.message);
      }
    });
  }

}

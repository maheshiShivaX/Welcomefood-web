import { Component, HostListener } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth.service';
import { HttpService } from 'src/app/_services/http.service';
import { environment } from 'src/app/environments/environment.prod';

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
    { storeid: 'Job', fromdate: 'fdg', todate:'dfg' }
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
  entryDate: string | undefined;
  otherList: any;
  storedata: any;
  insidesaleamount: any = 0;
  outsidesaleamount: any = 0;
  totalsaleamount: any = 0;
  showpayroll:boolean=false;
  showrebate:boolean=false;
  showDailysaleInput: boolean = true;
  showGasInput: boolean = false;
  showPurchasesInput: boolean = false;
  showExpensesnewInput: boolean = false;
  activeButtonIndex: number | null = 0;
  vendorList: any;
  productlist: any;
  productcategorylist: any;
  purchaseitemlist: any;
  constructor(private router: Router, private authService: AuthService, private route: ActivatedRoute,
    private http: HttpService, private toastr: ToastrService) {
    this.entryDate = new Date().toISOString().split('T')[0];

    this.selectedOption = "1";


    this.dated = this.entryDate;

    // this.storesdata[0].storeid = this.storeId;
    // this.storesdata[0].fromdate = this.dated;
    // this.storesdata[0].todate=this.dated

  }

  ngOnInit() {
    this.storeId = this.route.snapshot.params["storeId"];
    localStorage.setItem("storeid",this.storeId);

    this.dated = this.entryDate;

    // this.storesdata[0].storeid = this.storeId;
    // this.storesdata[0].fromdate = this.dated;
    // this.storesdata[0].todate=this.dated

    this.GetInsideSale(this.storeId, 1, this.entryDate);
    this.GetOtherSale(this.storeId, 1, this.entryDate);
    this. GetGetStoreClosingByStoreId(this.storeId, this.entryDate) ;
    this.GetAmountByGroupId(this.storeId, this.entryDate)
    // this.GetLotteryTypeStoreIdDate();
    // this.GetLotteryExpenseStoreIdDate();
    // this.GetGesdetailByDateStoreId();
    this.updateTotals();
// this.GetExpenseItemsByAmountDate();
this.  GetCreditCardByStoreIdDate();
  }


  


onother()
{
  this.isView= false;
}

lotterytype:any
lotteryamount:any;
lotteryamountExpense:any;
lotterytypeExpense:any;

GetLotteryTypeStoreIdDate() {
  this.http.getAll(environment.GetLotteryTypeStoreIdDate + "?pStoreId=" + this.storeId  + "&pAmountDate=" + this.entryDate).subscribe((result: any) => {
    if (result.isSuccess == 1) {
      console.log(result.data)
      this.lotterytype = result.data;


      this.lotteryamount  = this.lotterytype.reduce((acc: any, item: { lotteryAmount: any; }) => acc + (item.lotteryAmount || 0), 0);


    }
    else {
      this.lotterytype = null;
    }
  })
}
GetLotteryExpenseStoreIdDate() {
  this.http.getAll(environment.GetLotteryExpenseStoreIdDate + "?pStoreId=" + this.storeId  + "&pAmountDate=" + this.entryDate).subscribe((result: any) => {
    if (result.isSuccess == 1) {
      console.log(result.data)
      this.lotterytypeExpense = result.data;


      this.lotteryamountExpense  = this.lotterytypeExpense.reduce((acc: any, item: { lotteryAmount: any; }) => acc + (item.lotteryAmount || 0), 0);


    }
    else {
      this.lotterytype = null;
    }
  })
}

 

  gesinventory: any;

  GetGesdetailByDateStoreId() {
    this.http.getAll(environment.GetGesdetailByDateStoreId + "?pAmountDate=" + this.entryDate + "&pStoreId=" + this.storeId).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        console.log(result.data)
        this.gesinventory = result.data;

        this.inventory = this.gesinventory;
      }
      else {
        this.purchaseitemlist = null;
      }
    })
  }
  GetGesdetailByDateStoreIdonRest() {

    //alert('asd');
    this.http.getAll(environment.GetGesdetailByDateStoreIdonRest + "?pAmountDate=" + this.entryDate + "&pStoreId=" + this.storeId).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        console.log(result.data)
        this.gesinventory = result.data;

        this.inventory = this.gesinventory;
      }
      else {
        this.purchaseitemlist = null;
      }
    })
  }


  

  expenseitem:any;

  GetExpenseItemsByAmountDate() {
    this.http.getAll(environment.GetExpenseItemsByAmountDate + "?pStoreId=" + this.storeId + "&pExpenseGroupId=" + 2 +"&pAmountDate="+this.entryDate ).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        console.log(result.data)
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
        console.log(result.data)
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
closingdata:any;
  GetGetStoreClosingByStoreId(pStoreId: any, pAmountDate: any) {

    this.http.getAll(environment.GetStoreClosingByStoreId + "?pStoreId=" + pStoreId + "&pAmountDate=" + pAmountDate).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        console.log(result.data)
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
        console.log(result.data)
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
        console.log(result.data)
        this.otherList = result.data;
      }
      else {
        this.otherList = null;
      }
    })
  }
  isView:boolean=false;
  onsummary()
  {
    //alert('fg');
    this.dated = this.entryDate;
this.isView= true;
    this.storesdata[0].storeid = this.storeId;
    this.storesdata[0].fromdate = this.dated;
    this.storesdata[0].todate=this.dated
  }
  onTextboxLeave(event: Event, row: any): void {


    


    const inputElement = event.target as HTMLInputElement;
    console.log('Textbox value on leave:', inputElement.value);

    if (inputElement.value == '' || inputElement.value == '0') {

      this.http.getAll(environment.PDeleteItemSaleById + "?pStoreId=" + this.storeId + "&pAmountDate=" + this.entryDate + "&pProductId=" + row.productId).subscribe((result: any) => {
        if (result.isSuccess == 1) {
          console.log(result.data)
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
    console.log('Textbox value on leave:', inputElement.value);

  

    this.formCreditcard.patchValue({
        storeId: this.storeId,
        amountDate: this.entryDate,
        amount: inputElement.value,
        creditCardId:row.creditCardId,
        isActive: true,
        createdBy: 0,
      })
    this.onSubmitCreditCard();
    // Add your logic here
  }


  
  onTextboxLotteryLeave(event: Event, row: any): void {


    


    const inputElement = event.target as HTMLInputElement;
    console.log('Textbox value on leave:', inputElement.value);

  

    this.formLottery.patchValue({
        storeId: this.storeId,
        amountDate: this.entryDate,
        lotteryAmount: inputElement.value,
        lotteryTypeId:row.lotteryTypeId,
        isActive: true,
        createdBy: 0,
      })
    this.onSubmitLottery();
    // Add your logic here
  }



creditcardamount:any;
  creditcardlist:any;
  GetCreditCardByStoreIdDate() {

    this.http.getAll(environment.GetCreditCardByStoreIdDate+ "?pStoreId=" + this.storeId + "&pAmountDate=" + this.entryDate ).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        console.log(result.data)
        this.creditcardlist = result.data;

        this.creditcardamount  = this.creditcardlist.reduce((acc: any, item: { amount: any; }) => acc + (item.amount || 0), 0);


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
    console.log(this.form.value);
    if (this.form.invalid) {
      this.isLoading = false;
      return;
    }
    this.http.post(environment.SaveItemSale, this.form.value).subscribe((result: any) => {
      if (result.isSuccess == 1) {

        console.log(result.data);
        this.storedata = result.data;
        this.insidesaleamount = this.storedata.filter((x: { productGroupId: number; }) => x.productGroupId == 1)[0].amount;
        this.outsidesaleamount = this.storedata.filter((x: { productGroupId: number; }) => x.productGroupId != 1).reduce((acc: any, item: { amount: any; }) => acc + (item.amount || 0), 0);


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
    console.log('Textbox value on leave:', inputElement.value);

   
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

storeclosingdata:any;
storeclosingcash:any;
showSummaryInput:boolean=false;

  onSubmitClosing() {

    if (this.formClosing.value.amount == '' || this.formClosing.value.amount == '0') {
      return;
    }
    console.log(this.formClosing.value);
    if (this.formClosing.invalid) {
      this.isLoading = false;
      return;
    }
    this.http.post(environment.StoreClosing, this.formClosing.value).subscribe((result: any) => {
      if (result.isSuccess == 1) {

        console.log(result.data);
        this.storeclosingdata = result.data;

        this. GetGetStoreClosingByStoreId(this.storeId, this.entryDate) ;
        // this.toastr.success(result.message);
      }
      else {
        //  this.toastr.error(result.message);
      }
    });
  }

  dated:any;
  showlottery:boolean=false;
showOtherincome :boolean=false;
  showData(pid: any) {
     //alert(pid)
    this.showDailysaleInput = false;
    this.showGasInput = false;
    this.showPurchasesInput = false;
    this.showExpensesnewInput =false;
    this.showSummaryInput= false;
    this.showpayroll=false;
    this.showrebate=false;
    this.isView= false;
    this.showlottery= false;
    this.showOtherincome=false;
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
    }  else if (pid == 4) {
      this.showpayroll = true;
    }else if(pid==5)
    {
      this.showOtherincome = true;
    }
    else if (pid == 6) {
      this.showSummaryInput = true;

 this.dated = this.entryDate;

      this.storesdata[0].storeid = this.storeId;
      this.storesdata[0].fromdate = this.dated;
      this.storesdata[0].todate=this.dated

    }
  
    else if (pid == 7) {
      this.showrebate = true;
    }
    else if (pid == 8) {
      this.showlottery = true;
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




  selectedRowsitems: any[] = [];
  public formGes = new FormGroup({
    storeId: new FormControl(0),
    entryDate: new FormControl(''),
    gesInventoryDtos: new FormArray(this.selectedRowsitems),
  });


  inventory: InventoryItem[] = [
    { name: 'Open', regular: 0, plus: 0, premium: 0, diesel: 0, total: 0 },
    { name: 'Purchases', regular: 0, plus: 0, premium: 0, diesel: 0, total: 0 },
    { name: 'Purchases Rate', regular: 0, plus: 0, premium: 0, diesel: 0, total: 0 },
    { name: 'Sales', regular: 0, plus: 0, premium: 0, diesel: 0, total: 0 },
    { name: 'Sales Rate', regular: 0, plus: 0, premium: 0, diesel: 0, total: 0 },
    { name: 'Close', regular: 0, plus: 0, premium: 0, diesel: 0, total: 0 },
    { name: 'Physical', regular: 0, plus: 0, premium: 0, diesel: 0, total: 0 },
    { name: 'overShort', regular: 0, plus: 0, premium: 0, diesel: 0, total: 0 },
  ];






  selectedOption: string | undefined;

 


  updateTotals(): void {
    const open = this.inventory.find(item => item.name === 'Open');
    const purchases = this.inventory.find(item => item.name === 'Purchases');
    const purchasesrate = this.inventory.find(item => item.name === 'Purchases Rate');
    const sales = this.inventory.find(item => item.name === 'Sales');
    const salesRate = this.inventory.find(item => item.name === 'Sales Rate');
    const close = this.inventory.find(item => item.name === 'Close');
    const physical = this.inventory.find(item => item.name === 'Physical');
    const overShort = this.inventory.find(item => item.name === 'overShort');

    if (open && purchases && sales && close && physical && overShort && purchasesrate && overShort ) {
      // Calculate Close
      close.regular = (+open.regular) + (+purchases.regular) - (+sales.regular);
      close.plus = (+open.plus) + (+purchases.plus) - (+sales.plus);
      close.premium = (+open.premium) + (+purchases.premium) - (+sales.premium);
      close.diesel = (+open.diesel) + (+ purchases.diesel) - (+sales.diesel);

      // Calculate Physical
      // physical.regular = close.regular;
      // physical.plus = close.plus;
      // physical.premium = close.premium;
      // physical.diesel = close.diesel;

      // Calculate Over/Short
      // alert(physical.regular);

      overShort.regular = +((+physical.regular) - (+close.regular)).toFixed(2);
      overShort.plus = +((+physical.plus) - (+close.plus)).toFixed(2);;
      overShort.premium = +((+physical.premium) - (+close.premium)).toFixed(2);;
      overShort.diesel = + ((+physical.diesel) - (+close.diesel)).toFixed(2);;

      // Calculate totals for each row
      this.inventory.forEach(item => {

        if(item.name=='Purchases Rate' || item.name=='Sales Rate')
        {
          item.total = +(( (+item.regular) + (+item.plus) + (+item.premium) + (+item.diesel))/4) .toFixed(2);
        }else
        {
          item.total = +( (+item.regular) + (+item.plus) + (+item.premium) + (+item.diesel)).toFixed(2);
        }
      });

    }
  }

  isReadonly(name: string): boolean {


    if (name == 'Open') {
      return true;
    }
    else if (name == 'Close') {

      return true;
    }
    else if (name == 'overShort') {
      return true;
    } else {
      return false;
    }
  }

 
  onGesSubmit() {
    this.selectedRowsitems = this.inventory.filter(x => x.name == 'Purchases' || x.name == 'Sales' || x.name == 'Physical' || x.name == 'Purchases Rate' || x.name == 'Sales Rate');
    this.formGes.patchValue({
      storeId: +this.storeId,
      entryDate: this.entryDate,
      gesInventoryDtos: this.selectedRowsitems,
    })
    this.formGes.value.gesInventoryDtos = this.selectedRowsitems;
    console.log(this.formGes.value);
    if (this.formGes.invalid) {
      this.isLoading = false;
      return;
    }
    this.http.post(environment.SaveGesDetail, this.formGes.value).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        console.log(result);
        this.toastr.success(result.message);
      }
      else {
        this.isLoading = false;
        this.submitted = false;
        console.log(result);
        this.toastr.error(result.message);
      }
    });
  }

creditcarddata:any;
  onSubmitCreditCard() {


    if (this.formCreditcard.value.amount== '' || this.formCreditcard.value.amount == '0') {
      return;
    }
    console.log(this.formCreditcard.value);


    this.http.post(environment.SaveCreditCardDetail, this.formCreditcard.value).subscribe((result: any) => {
      if (result.isSuccess == 1) {

        console.log(result.data);
        this.creditcarddata = result.data;
        
        this.  GetCreditCardByStoreIdDate();

      }
      else {
        //  this.toastr.error(result.message);
      }
    });
  }


  onSubmitLottery() {


    if (this.formLottery.value.lotteryAmount== '' || this.formLottery.value.lotteryAmount == '0') {
      return;
    }
    console.log(this.formLottery.value);


    this.http.post(environment.SaveLotteryPayDetail, this.formLottery.value).subscribe((result: any) => {
      if (result.isSuccess == 1) {

        console.log(result.data);
       // this.lotterytype = result.data;


      
        
        this.  GetLotteryTypeStoreIdDate();
        this.  GetLotteryExpenseStoreIdDate();

      }
      else {
        //  this.toastr.error(result.message);
      }
    });
  }

}

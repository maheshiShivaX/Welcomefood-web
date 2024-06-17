import { Component } from '@angular/core';
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
  //today: string;
  insideList: any
  storeId: any;
  entryDate: string | undefined;
  otherList: any;
  storedata: any;
  insidesaleamount: any = 0;
  outsidesaleamount: any = 0;
  totalsaleamount: any = 0;
  showDailysaleInput: boolean = true;
  showGasInput: boolean = false;
  showPurchasesInput: boolean = false;
  showExpensesInput: boolean = false;
  activeButtonIndex: number | null = 0;
  vendorList: any;
  productlist: any;
  productcategorylist: any;
  purchaseitemlist: any;
  constructor(private router: Router, private authService: AuthService, private route: ActivatedRoute,
    private http: HttpService, private toastr: ToastrService) {
    this.entryDate = new Date().toISOString().split('T')[0];

    this.selectedOption = "1";




  }

  ngOnInit() {
    this.storeId = this.route.snapshot.params["storeId"];
    localStorage.setItem("storeid",this.storeId);
    this.GetInsideSale(this.storeId, 1, this.entryDate);
    this.GetOtherSale(this.storeId, 1, this.entryDate);
    this. GetGetStoreClosingByStoreId(this.storeId, this.entryDate) ;
    this.GetAmountByGroupId(this.storeId, this.entryDate)
    this.GetVendorDetail();
    this.GetProductCategoryByGroupId(this.storeId, 1);
    this.GetItemPurchaseByDatestoreId();
    this.GetGesdetailByDateStoreId();
    this.updateTotals();
this.GetExpenseItemsByAmountDate();
  }



  GetProductCategoryByGroupId(pStoreId: any, pGroupId: any) {

    this.http.getAll(environment.GetProductCategoryByStoreGroupId + "?pStoreId=" + pStoreId + "&pGroupId=" + pGroupId).subscribe((result: any) => {

      if (result.isSuccess == 1) {
        console.log(result.data)
        this.productcategorylist = result.data;
      }
      else {
        this.productcategorylist = null;
      }
    })
  }
  GetProductDetailbyCategoryId(pCategoryId: any) {


    this.http.getAll(environment.GetProductbyStoreId + "?pStoreId=" + this.storeId + "&pCategoryId=" + pCategoryId).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        console.log(result.data)
        this.productlist = result.data;
      }
      else {
        this.productlist = null;
      }
    })
  }

  GetItemPurchaseByDatestoreId() {
    this.http.getAll(environment.GetItemPurchaseByDatestoreId + "?pAmountDate=" + this.entryDate + "&pStoreid=" + this.storeId).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        console.log(result.data)
        this.purchaseitemlist = result.data;
      }
      else {
        this.purchaseitemlist = null;
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

  GetVendorDetail() {

    this.http.getAll(environment.GetVendorDetail).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        console.log(result.data)
        this.vendorList = result.data;
      }
      else {
        this.vendorList = null;
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

  showData(pid: any) {
    // alert(pid)
    this.showDailysaleInput = false;
    this.showGasInput = false;
    this.showPurchasesInput = false;
    this.showExpensesInput = false;
    this.showSummaryInput= false;
    if (pid == 0) {
      this.showDailysaleInput = true;
    }
    else if (pid == 1) {
      this.showGasInput = true;
    }
    else if (pid == 2) {
      this.showPurchasesInput = true;
    }
    else if (pid == 3) {
      this.showExpensesInput = true;
    }
    else if (pid == 4) {
      this.showSummaryInput = true;
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


  public formpurchase = new FormGroup({
    itemPurchaseId: new FormControl(0),
    vendorId: new FormControl(0, Validators.required),
    productCategoryId: new FormControl(0, Validators.required),
    productId: new FormControl(0, Validators.required),

    payMode: new FormControl(1, Validators.required),
    amount: new FormControl('', Validators.required),
    amountDate: new FormControl('2024-05-08', Validators.required),
    isActive: new FormControl(true),
    createdBy: new FormControl(0),
    storeId: new FormControl(0),
    chequeNo: new FormControl(''),
    description: new FormControl(''),
  });

  selectedRowsitems: any[] = [];
  public formGes = new FormGroup({
    storeId: new FormControl(0),
    entryDate: new FormControl(''),
    gesInventoryDtos: new FormArray(this.selectedRowsitems),
  });


  inventory: InventoryItem[] = [
    { name: 'Open', regular: 0, plus: 0, premium: 0, diesel: 0, total: 0 },
    { name: 'Purchases', regular: 0, plus: 0, premium: 0, diesel: 0, total: 0 },
    { name: 'Sales', regular: 0, plus: 0, premium: 0, diesel: 0, total: 0 },
    { name: 'Close', regular: 0, plus: 0, premium: 0, diesel: 0, total: 0 },
    { name: 'Physical', regular: 0, plus: 0, premium: 0, diesel: 0, total: 0 },
    { name: 'overShort', regular: 0, plus: 0, premium: 0, diesel: 0, total: 0 },
  ];





  onResetPurchase() {
    this.formpurchase.patchValue({

      itemPurchaseId: 0,
      vendorId: 0,
      productCategoryId: 0,
      productId: 0,

      payMode: 1,
      amount: '',
      amountDate: '',
      isActive: true,
      createdBy: 0,
      storeId: 0,
      chequeNo: '',
      description: '',

    })
  }

  onSubmitPurchase() {

    this.isLoading = true;
    this.submitted = true;

    this.formpurchase.patchValue({

      storeId: +this.storeId,
      amountDate: this.entryDate,
      chequeNo: this.selectedOption=="1" ? "" : this.formpurchase.value.chequeNo
    })

    if (this.formpurchase.value.amount == '' || this.formpurchase.value.amount == '0') {
      this.isLoading = false;
      this.toastr.error('Please enter valid amount')
      return;
    }

    console.log(this.formpurchase.value);
    if (this.formpurchase.invalid) {
      this.isLoading = false;
      return;
    }

    this.http.post(environment.SaveItemPurchase, this.formpurchase.value).subscribe((result: any) => {
      if (result.isSuccess == 1) {

        this.isLoading = false;
        this.submitted = false;
        this.GetItemPurchaseByDatestoreId();
        this.onResetPurchase();
        // this.onReset();
        // // this.GetStoreProduct();
        this.toastr.success(result.message);
        // this.GetProductGroup(this.storeid, this.entryDate);
        // this.GetItemSalebyCategoryid(this.groupId, this.storeid, this.entryDate)
      }
      else {
        this.isLoading = false;
        this.submitted = false;
        console.log(result);
        this.toastr.error(result.message);
      }
    });
  }

  selectedOption: string | undefined;

  onPayModeChange() {
    // alert(this.selectedOption);
  }


  updateTotals(): void {
    const open = this.inventory.find(item => item.name === 'Open');
    const purchases = this.inventory.find(item => item.name === 'Purchases');
    const sales = this.inventory.find(item => item.name === 'Sales');
    const close = this.inventory.find(item => item.name === 'Close');
    const physical = this.inventory.find(item => item.name === 'Physical');
    const overShort = this.inventory.find(item => item.name === 'overShort');

    if (open && purchases && sales && close && physical && overShort) {
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
        item.total = (+item.regular) + (+item.plus) + (+item.premium) + (+item.diesel);
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

  purchasentry: any;

  onEditpurchase(pId: any) {
    this.purchasentry = this.purchaseitemlist.filter((x: { itemPurchaseId: any; }) => x.itemPurchaseId == pId)

    console.log(this.purchasentry);
    this.formpurchase.patchValue({

      itemPurchaseId: this.purchasentry[0].itemPurchaseId, 
      vendorId:this.purchasentry[0].vendorId, 
      productCategoryId: this.purchasentry[0].productCategoryId, 
      productId: this.purchasentry[0].productId, 
      payMode: this.purchasentry[0].payMode, 
      amount: this.purchasentry[0].amount, 
      amountDate:this.purchasentry[0].amountDate, 
      isActive: this.purchasentry[0].isActive, 
      createdBy: this.purchasentry[0].createdBy, 
      storeId: this.purchasentry[0].storeId, 
      chequeNo: this.purchasentry[0].chequeNo, 
      description: this.purchasentry[0].description, 
    })
    this.selectedOption =this.purchasentry[0].payMode;
    this.formpurchase.value.payMode=+this.purchasentry[0].payMode;
    //alert( this.formpurchase.value.payMode);

  }
  onGesSubmit() {
    this.selectedRowsitems = this.inventory.filter(x => x.name == 'Purchases' || x.name == 'Sales' || x.name == 'Physical');
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

  


}

import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth.service';
import { HttpService } from 'src/app/_services/http.service';


import { environment } from 'src/app/environments/environment.prod';

@Component({
  selector: 'app-storesummary',
  templateUrl: './storesummary.component.html',
  styleUrls: ['./storesummary.component.scss']
})
export class StoresummaryComponent {

  @Input() storesdata: { storeid: string; fromdate: string, todate :string }[] = [];

  
  entryDate: any;
  storeid: any;
  insaidesaledata: any;
  totalinsideamount: any;
  vendorCategoryAmountscase: any;
  vendorCategoryAmountscheque: any;
  categories: any;
  expenseiteslist: any;
  totalinputcase: number = 0;
  totaloutamount: number = 0;
  totaldiffrence: number = 0;
  overshortamount: number = 0;
  otherList:any;
  constructor(private router: Router, private authService: AuthService, private route: ActivatedRoute,
    private http: HttpService, private toastr: ToastrService) {
    this.entryDate = new Date().toISOString().split('T')[0];

    // if(this.storesdata!=null && )
    // {
    //    // alert('asdf');
    //    this.storeid =this.storesdata[0].storeid;// localStorage.getItem("storeid");
    //    //this.tstoreid =this.storesdata[0].storeid;// localStorage.getItem("tStoreId");
    //    this.tfromdate = this.storesdata[0].fromdate; //localStorage.getItem("tfromdate");
    //    this.ttodate =this.storesdata[0].todate;

    // }  
  }
  tstoreid:any;
  tfromdate:any;
  ttodate:any;
  ngOnInit() {


   // alert('asdf');
    this.storeid =this.storesdata[0].storeid;// localStorage.getItem("storeid");
    //this.tstoreid =this.storesdata[0].storeid;// localStorage.getItem("tStoreId");
    this.tfromdate = this.storesdata[0].fromdate; //localStorage.getItem("tfromdate");
    this.ttodate =this.storesdata[0].todate;


//alert('asd');
    this.GetStoreSummary(this.storeid,this.tfromdate, this.ttodate) ;
    // this.GetItemSaleByStoreCategoryByStoreId(1)
    // // this.GetExpenseItemsByAmountDate();
    // this.GetStoreOpeningCashByStoreId();
    // // this.GetItemPurchaseByStoreIdcase(1);
    // // this.GetItemPurchaseByStoreIdcheqe(2);
    // this.GetExpenseItemsById(2);
    // this.GetGesdetailByDateStoreId();
    // this.GetAmountByGroupId();
    // this.GetExpenseItemsByStoreDateId();
    // this.GetGetStoreClosingByStoreId()
    // this.GetOtherSale(this.storeid, 1, this.entryDate);


  }
  storedetail:any;

  GetStoreSummary(pStoreId: any, pFromDate: any,pToDate :any) {

    this.http.getAll(environment.StoreSummary + "?pStoreId=" + pStoreId + "&pFromDate=" + pFromDate + "&pToDate=" + pToDate).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        console.log(result.data)
        this.storedetail = result.data;


        this.vendorCategoryAmountscase = this.storedetail.purchaseCash;
        if (this.vendorCategoryAmountscase.length > 0) {
          this.categories = Object.keys(this.vendorCategoryAmountscase[0].amounts);
        }
        this.calculateTotalAmounts();

        this.vendorCategoryAmountscheque = this.storedetail.purchaseCheque;
        if (this.vendorCategoryAmountscheque.length > 0) {
          this.categories = Object.keys(this.vendorCategoryAmountscheque[0].amounts);
        }
        this.calculateTotalAmountscheck();

      }
      else {
        alert('asd');
        this.storedetail = null;
      }
    })
  }



  
openingbal:any
openingcash:number=0;
  

lotteryData:any;
lotteryamountsale:any;




  closingdata: any;
  storeclosingcash: any;
 




  GetItemPurchaseByStoreIdcheqe(payType: any) {
    this.http.getAll(environment.GetItemPurchaseByStoreId + "?pAmountDate=" + this.entryDate + "&pStoreid=" + this.storeid + "&pPayType=" + 2).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        console.log(result.data)
        this.vendorCategoryAmountscheque = result.data;
        if (result.data.length > 0) {
          this.categories = Object.keys(result.data[0].amounts);
        }
        this.calculateTotalAmountscheck();
      }
      else {
        // this.insaidesaledata = null;
      }
    })
  }
  totalAmounts: { [key: string]: number } = {};
  totalAmountscheque: { [key: string]: number } = {};
  totalamountpurchasecash: number = 0;
  totalamountpurchasecheque: number = 0;
  calculateTotalAmounts(): void {
    this.totalAmounts = {};
    for (let category of this.categories) {
      this.totalAmounts[category] = this.vendorCategoryAmountscase.reduce((sum: any, item: { amounts: { [x: string]: any; }; }) => sum + (item.amounts[category] || 0), 0);
      this.totalamountpurchasecash = this.totalamountpurchasecash + (+this.totalAmounts[category]);
    }
  }
  calculateTotalAmountscheck(): void {
    this.totalAmountscheque = {};
    for (let category of this.categories) {
      this.totalAmountscheque[category] = this.vendorCategoryAmountscheque.reduce((sum: any, item: { amounts: { [x: string]: any; }; }) => sum + (item.amounts[category] || 0), 0);
      this.totalamountpurchasecheque = this.totalamountpurchasecheque + (+this.totalAmountscheque[category]);
    }
  }

  getTotalAmountForVendor(vendor: any): number {
    return this.categories.reduce((sum: any, category: string | number) => sum + (vendor.amounts[category] || 0), 0);
  }

  expensecase: any;
  expensecheque: any;
  expanseamountcase: any;
  expanseamountcheque: any
  gesinventory: any;
  GetExpenseItemsById(pGroupId: any) {
    this.http.getAll(environment.GetExpenseItemsById + "?pStoreId=" + this.storeid + "&pExpenseGroupId=" + pGroupId + "&pAmountDate=" + this.entryDate).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        console.log(result.data)
        this.expenseiteslist = result.data;
        this.expensecase = this.expenseiteslist.filter((x: { payModeId: any; }) => x.payModeId == +1)
        this.expanseamountcase = this.expensecase.reduce((acc: any, item: { amount: any; }) => acc + (item.amount || 0), 0);
        this.expensecheque = this.expenseiteslist.filter((x: { payModeId: any; }) => x.payModeId == +2)
        this.expanseamountcheque = this.expensecheque.reduce((acc: any, item: { amount: any; }) => acc + (item.amount || 0), 0);


      }
      else {
        this.expenseiteslist = null;
      }
    })
  }
  GetGesdetailByDateStoreId() {
    this.http.getAll(environment.GetGesdetailByDateStoreId + "?pAmountDate=" + this.entryDate + "&pStoreId=" + this.storeid).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        console.log(result.data)
        this.gesinventory = result.data;
      }
      else {
        this.gesinventory = null;
      }
    })
  }

  saledata: any;

  coninup: any;
  otheramount: any;
  lottery: any;
  salestax: any;
  gessale: any;



  GetAmountByGroupId() {

    this.http.getAll(environment.GetAmountByGroupId + "?pStoreId=" + this.storeid + "&pAmountDate=" + this.entryDate).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        console.log(result.data)
        this.saledata = result.data;
        this.coninup = this.saledata.filter((x: { productGroupName: string; }) => x.productGroupName == 'Arcade').reduce((acc: any, item: { amount: any; }) => acc + (item.amount || 0), 0);
        this.otheramount = this.saledata.filter((x: { productGroupName: string; }) => x.productGroupName == 'Other Income').reduce((acc: any, item: { amount: any; }) => acc + (item.amount || 0), 0);
        //this.lottery = this.saledata.filter((x: { productGroupName: string; }) => x.productGroupName == 'Lottery').reduce((acc: any, item: { amount: any; }) => acc + (item.amount || 0), 0);
        this.salestax = this.saledata.filter((x: { productGroupName: string; }) => x.productGroupName == 'Taxes').reduce((acc: any, item: { amount: any; }) => acc + (item.amount || 0), 0);
        this.gessale = this.saledata.filter((x: { productGroupName: string; }) => x.productGroupName == 'Gas').reduce((acc: any, item: { amount: any; }) => acc + (item.amount || 0), 0);
        this.totalinputcase = this.totalinputcase + (+this.coninup) + (+this.otheramount) + (+this.lottery) + (+this.salestax) + (+this.gessale)//+ (+this.totalinsideamount)  //(+this.storeclosingcash) + (+this.totalinsideamount)



        // this.insidesaleamount = this.storedata.filter((x: { productGroupId: number; }) => x.productGroupId == 1)[0].amount;
        // this.outsidesaleamount = this.storedata.filter((x: { productGroupId: number; }) => x.productGroupId != 1).reduce((acc: any, item: { amount: any; }) => acc + (item.amount || 0), 0);
        // this.totalsaleamount = this.storedata.reduce((acc: any, item: { amount: any; }) => acc + (item.amount || 0), 0);
      }
      else {
        // this.insideList = null;
      }
    })
  }


  expenselist: any;
  creditcardamounts: any;
  storeexpenseamounts: any;
  lotteryamounts: any;
  otheramounts: any;
  payrollamounts: any;
  arcadeamounts: any;
  otherpyaoutdataCash: any;
  otherpyaoutdataCashamount: any;
  otherpyaoutdataCheque: any;
  otherpyaoutdataChequeamount: any;

  payrollpyaoutdataCash: any;
  payrollpyaoutdataCashamount: any;
  payrollpyaoutdataCheque: any;
  payrollpyaoutdataChequeamount: any;

  lotterypyaoutdataCash: any;
  lotterypyaoutdataCashamount: any;
  lotterypyaoutdataCheque: any;
  lotterypyaoutdataChequeamount: any;




  payrolldata: any;
  GetExpenseItemsByStoreDateId() {

    this.http.getAll(environment.GetExpenseItemsByStoreDateId + "?pStoreId=" + this.storeid + "&pAmountDate=" + this.entryDate).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        console.log(result.data)
        this.expenselist = result.data;
        this.creditcardamounts = this.expenselist.filter((x: { expenseGroupName: string; }) => x.expenseGroupName == 'Credit Cards').reduce((acc: any, item: { amount: any; }) => acc + (item.amount || 0), 0);
        this.storeexpenseamounts = this.expenselist.filter((x: { expenseGroupName: string; }) => x.expenseGroupName == 'Store Expenses').reduce((acc: any, item: { amount: any; }) => acc + (item.amount || 0), 0);
        this.lotteryamounts = this.expenselist.filter((x: { payModeId: number; expenseGroupName: string; }) => x.expenseGroupName == 'Lottery Payouts' && x.payModeId == 1 ).reduce((acc: any, item: { amount: any; }) => acc + (item.amount || 0), 0);
        this.otheramounts = this.expenselist.filter((x: { payModeId: number; expenseGroupName: string; }) => x.expenseGroupName == 'Other Payouts' && x.payModeId == 1).reduce((acc: any, item: { amount: any; }) => acc + (item.amount || 0), 0);
        this.payrollamounts = this.expenselist.filter((x: { expenseGroupName: string; }) => x.expenseGroupName == 'Payroll').reduce((acc: any, item: { amount: any; }) => acc + (item.amount || 0), 0);
        this.arcadeamounts = this.expenselist.filter((x: { expenseGroupName: string; }) => x.expenseGroupName == 'Arcade Payouts').reduce((acc: any, item: { amount: any; }) => acc + (item.amount || 0), 0);

        this.otherpyaoutdataCash = this.expenselist.filter((x: { payModeId: number; expenseGroupName: string; }) => x.expenseGroupName == 'Other Payouts' && x.payModeId == 1);
        this.otherpyaoutdataCashamount = this.expenselist.filter((x: { payModeId: number; expenseGroupName: string; }) => x.expenseGroupName == 'Other Payouts' && x.payModeId == 1).reduce((acc: any, item: { amount: any; }) => acc + (item.amount || 0), 0);;
        this.otherpyaoutdataCheque = this.expenselist.filter((x: { payModeId: number; expenseGroupName: string; }) => x.expenseGroupName == 'Other Payouts' && x.payModeId == 2);
        this.otherpyaoutdataChequeamount = this.expenselist.filter((x: { payModeId: number; expenseGroupName: string; }) => x.expenseGroupName == 'Other Payouts' && x.payModeId == 2).reduce((acc: any, item: { amount: any; }) => acc + (item.amount || 0), 0);;

        this.payrollpyaoutdataCash = this.expenselist.filter((x: { payModeId: number; expenseGroupName: string; }) => x.expenseGroupName == 'Payroll' && x.payModeId == 1);
        this.payrollpyaoutdataCashamount = this.expenselist.filter((x: { payModeId: number; expenseGroupName: string; }) => x.expenseGroupName == 'Payroll' && x.payModeId == 1).reduce((acc: any, item: { amount: any; }) => acc + (item.amount || 0), 0);;
        this.payrollpyaoutdataCheque = this.expenselist.filter((x: { payModeId: number; expenseGroupName: string; }) => x.expenseGroupName == 'Payroll' && x.payModeId == 2);
        this.payrollpyaoutdataChequeamount = this.expenselist.filter((x: { payModeId: number; expenseGroupName: string; }) => x.expenseGroupName == 'Payroll' && x.payModeId == 2).reduce((acc: any, item: { amount: any; }) => acc + (item.amount || 0), 0);;


        this.lotterypyaoutdataCash = this.expenselist.filter((x: { payModeId: number; expenseGroupName: string; }) => x.expenseGroupName == 'Lottery Payouts' && x.payModeId == 1);
        this.lotterypyaoutdataCashamount = this.expenselist.filter((x: { payModeId: number; expenseGroupName: string; }) => x.expenseGroupName == 'Lottery Payouts' && x.payModeId == 1).reduce((acc: any, item: { amount: any; }) => acc + (item.amount || 0), 0);;
        this.lotterypyaoutdataCheque = this.expenselist.filter((x: { payModeId: number; expenseGroupName: string; }) => x.expenseGroupName == 'Lottery Payouts' && x.payModeId == 2);
        this.lotterypyaoutdataChequeamount = this.expenselist.filter((x: { payModeId: number; expenseGroupName: string; }) => x.expenseGroupName == 'Lottery Payouts' && x.payModeId == 2).reduce((acc: any, item: { amount: any; }) => acc + (item.amount || 0), 0);;



        this.payrolldata = this.expenselist.filter((x: { expenseGroupName: string; }) => x.expenseGroupName == 'Payroll')



        this.totaloutamount = this.totaloutamount + (+this.creditcardamounts) + (+this.expanseamountcase) + (+this.lotterypyaoutdataCashamount) + (+this.otheramounts) + (+this.payrollpyaoutdataCashamount) + (+this.arcadeamounts);
        //alert(this.totalinputcase )
        //alert( this.totaloutamount)
        this.totaldiffrence = this.totalinputcase - this.totaloutamount;

        if (this.storeclosingcash > this.totaldiffrence) {

          this.overshortamount = this.storeclosingcash - this.totaldiffrence
        } else {
          this.overshortamount = this.totaldiffrence - this.storeclosingcash
        }

        // this.insidesaleamount = this.storedata.filter((x: { productGroupId: number; }) => x.productGroupId == 1)[0].amount;
        // this.outsidesaleamount = this.storedata.filter((x: { productGroupId: number; }) => x.productGroupId != 1).reduce((acc: any, item: { amount: any; }) => acc + (item.amount || 0), 0);
        // this.totalsaleamount = this.storedata.reduce((acc: any, item: { amount: any; }) => acc + (item.amount || 0), 0);
      }
      else {
        // this.insideList = null;
      }
    })
  }




}

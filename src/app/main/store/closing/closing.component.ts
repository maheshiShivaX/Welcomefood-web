import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/_services/auth.service';
import { HttpService } from 'src/app/_services/http.service';
import { TriggerdailyService } from 'src/app/_services/triggerdaily.service';
import { environment } from 'src/app/environments/environment.prod';

@Component({
  selector: 'app-closing',
  templateUrl: './closing.component.html',
  styleUrls: ['./closing.component.scss']
})
export class ClosingComponent {

  @Input() storesdata: { storeid: string; fromdate: string, todate :string }[] = [];

  validateNumber(event: KeyboardEvent) {
    const charCode = event.which ? event.which : event.keyCode;
    const inputChar = String.fromCharCode(charCode);
    const pattern = /[0-9]|\./;

    if (!pattern.test(inputChar) && charCode > 31) {
      event.preventDefault();
    }
  
  }
  storeclosingdata:any;
  isLoading:boolean=false;
  storeId:any;
  dated:any;
  entryDate: any;
  validateDecimalPlaces(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;

    if (value.includes('.') && value.split('.')[1].length > 2) {
      inputElement.value = value.substring(0, value.length - 1);
    }
  }
  private dataChangeSubscription: Subscription;
  constructor(private router: Router, private authService: AuthService, private route: ActivatedRoute,
    private http: HttpService, private toastr: ToastrService,private dataService: TriggerdailyService,) {
    this.entryDate = new Date().toISOString().split('T')[0];

    this.dated = this.entryDate;

    this.dataChangeSubscription = this.dataService.dataChange$.subscribe((menutype: any) => {
   
      if(menutype=='9')
      {
        this.storeId =localStorage.getItem("storeid");
        this.entryDate =localStorage.getItem("tentrydate") 
  
       
    //this.storeId = this.route.snapshot.params["storeId"];
    localStorage.setItem("storeid",this.storeId);

    this.dated = this.entryDate;
    this.GetStoreSummary(this.storeId, this.entryDate,this.entryDate);
    this. GetGetStoreClosingByStoreId(this.storeId, this.entryDate) ;
      }
      
    });

  }

  ngOnInit() {
       // alert('asdf');
       this.storeId =this.storesdata[0].storeid;// localStorage.getItem("storeid");
       //this.tstoreid =this.storesdata[0].storeid;// localStorage.getItem("tStoreId");
       this.entryDate = this.storesdata[0].fromdate; //localStorage.getItem("tfromdate");
       

       
    //this.storeId = this.route.snapshot.params["storeId"];
    localStorage.setItem("storeid",this.storeId);

    this.dated = this.entryDate;
    this.GetStoreSummary(this.storeId, this.entryDate,this.entryDate);
    this. GetGetStoreClosingByStoreId(this.storeId, this.entryDate) ;

  }
  storedetail:any;
  
  GetStoreSummary(pStoreId: any, pFromDate: any,pToDate :any) {

    this.http.getAll(environment.StoreSummary + "?pStoreId=" + pStoreId + "&pFromDate=" + pFromDate + "&pToDate=" + pToDate).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        
        this.storedetail = result.data;


       

      }
      else {
        this.storedetail = null;
      }
    })
  }



  onTextboxLeaveClosingStock(event: Event): void {
    const inputElement = event.target as HTMLInputElement;



    this.formstock.patchValue({
        physicalStock: inputElement.value,
        closingStockId:0,
        totalPurchase:this.storedetail.purchaseAmount,
        totalSale:this.storedetail.saleAmount,
        stockPercent:this.storedetail.stockPercent,
        storeId: this.storeId,
        amount:this.storedetail.closingStock ,
        amountDate: this.entryDate,
        isActive: true,
        createdBy: 0,
    });

     
      this.onSubmitStock();
    


    // Add your logic here
  }




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

  public formClosing = new FormGroup({
    closingCashId: new FormControl(0),
    storeId: new FormControl(0, Validators.required),
    amount: new FormControl('', Validators.required),
    amountDate: new FormControl('2024-05-08', Validators.required),
    isActive: new FormControl(true),
    createdBy: new FormControl(0),
  });


  public formstock = new FormGroup({
    physicalStock: new FormControl(''),
    closingStockId:new FormControl(0),
    totalPurchase:new FormControl(0),
    totalSale:new FormControl(0),
    stockPercent:new FormControl(0),
    storeId: new FormControl(0, Validators.required),
    amount: new FormControl('', Validators.required),
    amountDate: new FormControl('2024-05-08', Validators.required),
    isActive: new FormControl(true),
    createdBy: new FormControl(0),
  });



 storeclosingstock:any='0.00'
  onSubmitStock() {

    if (this.formstock.value.amount == '' || this.formstock.value.amount == '0') {
      return;
    }



    if (this.formstock.invalid) {
      this.isLoading = false;
      return;
    }
    this.http.post(environment.SaveClosingStock, this.formstock.value).subscribe((result: any) => {
      if (result.isSuccess == 1) {

        ;
        this.storeclosingdata = result.data;

        this. GetGetStoreClosingByStoreId(this.storeId, this.entryDate) ;
        // this.toastr.success(result.message);
      }
      else {
        //  this.toastr.error(result.message);
      }
    });
  }
  


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

        this. GetGetStoreClosingByStoreId(this.storeId, this.entryDate) ;
        // this.toastr.success(result.message);
      }
      else {
        //  this.toastr.error(result.message);
      }
    });
  }

  storeclosingcash:any;
  closingdata:any;
  GetGetStoreClosingByStoreId(pStoreId: any, pAmountDate: any) {

    this.http.getAll(environment.GetStoreClosingByStoreId + "?pStoreId=" + pStoreId + "&pAmountDate=" + pAmountDate).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        
        this.closingdata = result.data;
        this.storeclosingcash = this.closingdata[0].amount;
        this.storeclosingstock = this.closingdata[0].physicalCLosingStock;
      }
      else {
       // this.insideList = null;
      }
    })
  }


}

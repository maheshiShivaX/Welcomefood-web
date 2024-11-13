import { Component, Input } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/_services/auth.service';
import { HttpService } from 'src/app/_services/http.service';
import { TriggerdailyService } from 'src/app/_services/triggerdaily.service';
import { environment } from 'src/app/environments/environment.prod';

@Component({
  selector: 'app-gesentry',
  templateUrl: './gesentry.component.html',
  styleUrls: ['./gesentry.component.scss']
})
export class GesentryComponent {

  @Input() storesdata: { storeid: string; fromdate: string, todate :string }[] = [];

  entryDate: any
  companyId: any;
  storeid: any;
  gesdetail: any;
  isLoading: boolean = false;
  submitted: boolean = false;
  gasamount:any='0.00';
  private dataChangeSubscription: Subscription;
  constructor(private router: Router, private authService: AuthService, private route: ActivatedRoute,
    private http: HttpService, private toastr: ToastrService,private dataService: TriggerdailyService) {
    this.entryDate = new Date().toISOString().split('T')[0];
    this.authService.currentUser.subscribe((user) => {
      const currentUser = user;
      // this.formExpense.value.createdBy = currentUser.loginId;
      this.companyId = currentUser.companyId;
    });

    this.dataChangeSubscription = this.dataService.dataChange$.subscribe((menutype: any) => {
      console.log('Menu type changed to:', menutype);
      if(menutype=='1')
      {
        this.storeid =localStorage.getItem("storeid");
        this.entryDate =localStorage.getItem("tentrydate") 
        this.GetGasSaleByStoreDate();
       this.GetGesTransactionByIdStoreIdDate(this.storeid, this.entryDate);
      }
      
    });

  }

  DeleteGesInvoiceById(payType:any)
  {
    this.http.getAll(environment.DeleteGasSaleByStoreIdDate + "?pStoreId=" + this.storeid + "&pAmountDate=" + this.entryDate + "&pAmountType=" + payType ).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        console.log(result.data)
        this.GetGasSaleByStoreDate();

      }
      else {
        this.GetGasSaleByStoreDate();
      }
    })
  }
  public form = new FormGroup({
    gasSaleId: new FormControl(0),
    storeId: new FormControl(0, Validators.required),
    amount: new FormControl(''),
    amountDate: new FormControl('', Validators.required),
    isActive: new FormControl(true),
    createdBy: new FormControl(0),
    amountType:new FormControl(''),
  });





  onTextboxLeave(event: Event, paytype: any): void {

    const inputElement = event.target as HTMLInputElement;
    console.log('Textbox value on leave:', inputElement.value);

    if (inputElement.value == '' || inputElement.value == '0') {

      this.http.getAll(environment.DeleteGasSaleByStoreIdDate + "?pStoreId=" + this.storeid + "&pAmountDate=" + this.entryDate + "&pAmountType=" + paytype ).subscribe((result: any) => {
        if (result.isSuccess == 1) {
          console.log(result.data)
          this.GetGasSaleByStoreDate();

        }
        else {
          this.GetGasSaleByStoreDate();
        }
      })

    } else {
      this.form.patchValue({
        storeId: this.storeid,
        amountDate: this.entryDate,
        gasSaleId: 0,
        amount: inputElement.value,
        isActive: true,
        createdBy: 0,
        amountType:paytype
      })
      this.onSubmit();
    }
  }

  onSubmit() {
    if (this.form.value.amount == '' || this.form.value.amount == '0') {
      return;
    }
    console.log(this.form.value);


    this.http.post(environment.SaveGasSale, this.form.value).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        this.GetGasSaleByStoreDate();
        console.log(result.data);
      }
      else {
        //  this.toastr.error(result.message);
      }
    });
  }
  gasdiscount:any='0.00';
gasdata:any;
GetGasSaleByStoreDate() {
    this.http.getAll(environment.GetGasSaleByStoreDate + "?pStoreId=" + this.storeid + "&pAmountDate=" + this.entryDate).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        console.log(result.data)
        this.gasdata = result.data;

        var res1 = this.gasdata.filter((x: { amountType: string; }) => x.amountType == "Sale")
        if (res1 != null && res1.length > 0) {
          this.gasamount = res1[0].amount.toFixed(2);
        }else
        {
          this.gasamount='0.00';
        }
        var res2 = this.gasdata.filter((x: { amountType: string; }) => x.amountType == "Discount")

        if (res2 != null && res2.length > 0) {
          this.gasdiscount = res2[0].amount.toFixed(2);
        }else
        {
          this.gasdiscount='0.00';
        }
      }
      else {
        this.gasdata = null;
        this.gasamount='0.00';
        this.gasdiscount='0.00';
      }
    })
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


  ngOnInit() {
    //this.storeid = localStorage.getItem("storeid");

       // alert('asdf');
       this.storeid =this.storesdata[0].storeid;// localStorage.getItem("storeid");
       //this.tstoreid =this.storesdata[0].storeid;// localStorage.getItem("tStoreId");
       this.entryDate = this.storesdata[0].fromdate; //localStorage.getItem("tfromdate");
       //this.ttodate =this.storesdata[0].todate;
   

this.GetGasSaleByStoreDate();
    this.GetGesTransactionByIdStoreIdDate(this.storeid, this.entryDate);
  }


  invoicedata: any;
  GetGesTransactionByIdStoreIdDate(pStoreId: any, pAmountDate: any) {
    this.http.getAll(environment.GetGesTransactionByIdStoreIdDate + "?pStoreId=" + this.storeid + "&pEntryDate=" + pAmountDate).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        console.log(result.data)
        this.gesdetail = result.data;
      }
      else {
        this.invoicedata = null;
      }
    })
  }

  GetGesdetailByDateStoreIdonRest() {

  }

  updateTotals(item: any) { 
   // item.sales=((+item.saleCash) + (+item.saleCard))
    item.closingStock =( (+item.openStock) + (+item.purchases) - (+item.sales)).toFixed(2);
    item.overShort =+( item.physicalStock -item.closingStock).toFixed(2);
   // item.salesRate=(((+item.saleCardRate) + (+item.saleCashRate))/2).toFixed(2);

  }

  selectedRowsitems: any[] = [];
  public formGes = new FormGroup({
    storeId: new FormControl(0),
    entryDate: new FormControl(''),
    isActive: new FormControl(true),
    createdBy: new FormControl(0),
    gesInventoryDtos: new FormArray(this.selectedRowsitems),
  });

  onGesSubmit() {
    this.selectedRowsitems = this.gesdetail;
    this.formGes.patchValue({
      storeId: +this.storeid,
      entryDate: this.entryDate,
      gesInventoryDtos: this.selectedRowsitems,
      isActive: true,
      createdBy: 0
    })
    this.formGes.value.gesInventoryDtos = this.selectedRowsitems;
    console.log(this.formGes.value);
    if (this.formGes.invalid) {
      this.isLoading = false;
      return;
    }
    this.http.post(environment.SaveGes, this.formGes.value).subscribe((result: any) => {
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

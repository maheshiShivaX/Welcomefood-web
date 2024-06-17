import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth.service';
import { HttpService } from 'src/app/_services/http.service';
import { environment } from 'src/app/environments/environment.prod';

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

  constructor(private router: Router, private authService: AuthService, private route: ActivatedRoute,
    private http: HttpService, private toastr: ToastrService) {
    this.entryDate = new Date().toISOString().split('T')[0];
  }

  ngOnInit() {
    this.storeId = this.route.snapshot.params["storeId"];
    this.GetInsideSale(this.storeId, 1, this.entryDate);
    this.GetOtherSale(this.storeId, 1, this.entryDate);
    this.GetAmountByGroupId(this.storeId, this.entryDate)

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
        this.insideList = null;
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
          this.insideList = null;
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

  showData(pid: any) {
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
  activeIndex: number | null = null;

  toggleActive(index: number): void {
    this.activeIndex = index === this.activeIndex ? null : index;
  }


}

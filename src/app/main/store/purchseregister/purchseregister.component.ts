import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth.service';
import { HttpService } from 'src/app/_services/http.service';
import { environment } from 'src/app/environments/environment.prod';

@Component({
  selector: 'app-purchseregister',
  templateUrl: './purchseregister.component.html',
  styleUrls: ['./purchseregister.component.scss']
})
export class PurchseregisterComponent {


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
  isLoading: boolean = false;
  submitted: boolean = false;
  entryDate:any;

  constructor(private router: Router, private authService: AuthService, private route: ActivatedRoute,
    private http: HttpService, private toastr: ToastrService) {
    this.entryDate = new Date().toISOString().split('T')[0];

    this.selectedOption = "1";
  }

  selectedOption: string | undefined;
  storeId :any;
  purchaseitemlist:any;
  vendorList:any;

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
    this.storeId = this.route.snapshot.params["storeId"];
    localStorage.setItem("storeid",this.storeId);
this.  GetVendorDetail();
    this.GetProductCategoryByGroupId(this.storeId, 1);
    this.GetItemPurchaseByDatestoreId();

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

  purchasentry: any;
  productlist:any;
  productcategorylist:any;
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

  onPayModeChange() {
    // alert(this.selectedOption);
  }

  GetProductCategoryByGroupId(pStoreId: any, pGroupId: any) {

    this.http.getAll(environment.GetProductCategoryByStoreGroupId + "?pStoreId=" + pStoreId + "&pGroupId=" + pGroupId).subscribe((result: any) => {

      if (result.isSuccess == 1) {
        console.log("category",result.data)
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


}

import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth.service';
import { HttpService } from 'src/app/_services/http.service';
import { environment } from 'src/app/environments/environment.prod';

@Component({
  selector: 'app-gesentry',
  templateUrl: './gesentry.component.html',
  styleUrls: ['./gesentry.component.scss']
})
export class GesentryComponent {

  entryDate: any
  companyId: any;
  storeid: any;
  gesdetail: any;
  isLoading: boolean = false;
  submitted: boolean = false;
  constructor(private router: Router, private authService: AuthService, private route: ActivatedRoute,
    private http: HttpService, private toastr: ToastrService) {
    this.entryDate = new Date().toISOString().split('T')[0];


    this.authService.currentUser.subscribe((user) => {
      const currentUser = user;
      // this.formExpense.value.createdBy = currentUser.loginId;
      this.companyId = currentUser.companyId;
    });
  }


  ngOnInit() {
    this.storeid = localStorage.getItem("storeid");
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
    
    item.closingStock = (+item.openStock) + (+item.purchases) - (+item.sales);

 
    item.overShort =+( item.physicalStock -item.closingStock).toFixed(2);
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

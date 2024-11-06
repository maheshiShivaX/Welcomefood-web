import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/_services/auth.service';
import { HttpService } from 'src/app/_services/http.service';
import { TriggerdailyService } from 'src/app/_services/triggerdaily.service';
import { environment } from 'src/app/environments/environment.prod';

@Component({
  selector: 'app-gesinvoice',
  templateUrl: './gesinvoice.component.html',
  styleUrls: ['./gesinvoice.component.scss']
})
export class GesinvoiceComponent {
  private dataChangeSubscription: Subscription;
  @Input() storesdata: { storeid: string; fromdate: string, todate :string }[] = [];
  entryDate:any;
  selectedOption:any;
  companyId:any;

  constructor(private router: Router, private authService: AuthService, private route: ActivatedRoute,
    private http: HttpService, private toastr: ToastrService, private dataService: TriggerdailyService,) {
    this.entryDate = new Date().toISOString().split('T')[0];
    this.selectedOption = 1;

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
        this.GetGesInvoiceByStoreIdDate(this.storeid, this.entryDate);
      }
      
    });
  }

public form = new FormGroup({
  gesInvoiceId: new FormControl(0),
  storeId: new FormControl(0),
  invoiceNo: new FormControl(''),
  invoiceDate: new FormControl(''),
  totalAmount: new FormControl('0.00'),
  totalGes: new FormControl('0.00'),
  avgAmount: new FormControl('0.00'),
  isActive: new FormControl(true),
  createdBy: new FormControl(0)
});





storeid:any;
employeeList:any

ngOnInit() {
    this.storeid =this.storesdata[0].storeid;// localStorage.getItem("storeid");

    this.entryDate = this.storesdata[0].fromdate; //localStorage.getItem("tfromdate");
  this.GetGesInvoiceByStoreIdDate(this.storeid, this.entryDate);
}


  invoicedata:any;
  GetGesInvoiceByStoreIdDate( pStoreId: any , pAmountDate:any) {
    this.http.getAll(environment.GetGesInvoiceByStoreIdDate + "?pStoreId=" + this.storeid+ "&pInvoiceDate="+ pAmountDate ).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        console.log(result.data)
        this.invoicedata = result.data;
      }
      else {
        this.invoicedata = null;
      }
    })
  }
  

  DeleteGesInvoiceById( pGesInvoiceId: any) {
    this.http.getAll(environment.DeleteGesInvoiceById + "?pGesInvoiceId=" + pGesInvoiceId ).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        this.GetGesInvoiceByStoreIdDate(this.storeid, this.entryDate);
        this.toastr.success(result.message);
      }
      else {
        this.invoicedata = null;
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


  onSubmit() {


    this.form.patchValue({
      storeId: this.storeid,
    });
    if (this.form.value.totalAmount == '0.00') {

      this.toastr.error('Please enter valid amount')
      return;
    }

    console.log(this.form.value);
    if (this.form.invalid) {

      return;
    }

    this.http.post(environment.SaveGesInvoice, this.form.value).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        this.GetGesInvoiceByStoreIdDate(this.storeid, this.entryDate);
        
        this.onReset();
        this.toastr.success(result.message);
      }
      else {
        console.log(result);
        this.toastr.error(result.message);
      }
    });
  }
  onReset()
  {
    this.form.patchValue({
      gesInvoiceId: 0,
      storeId: 0,
      invoiceNo: '',
      invoiceDate:'',
      totalAmount:'0.00',
      totalGes: '0.00',
      avgAmount:'0.00',
      isActive:true
    });
  }




salaryList:any;

  onedit(pid:any)
  {
    this.salaryList = this.invoicedata.filter((x: {gesInvoiceId: any; }) => x.gesInvoiceId == pid);

    this.form.patchValue({
      gesInvoiceId: this.salaryList[0].gesInvoiceId,
      storeId: this.salaryList[0].storeId,
      invoiceNo: this.salaryList[0].invoiceNo,
      invoiceDate: this.salaryList[0].invoiceDate,
      totalAmount: this.salaryList[0].totalAmount,
      totalGes: this.salaryList[0].totalGes,
      avgAmount:this.salaryList[0].avgAmount, 
      isActive:this.salaryList[0].isActive
    });
  
  }
}


import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth.service';
import { HttpService } from 'src/app/_services/http.service';
import { environment } from 'src/app/environments/environment.prod';


interface TableRow {


  storeDataId:number,
  value1: string,
  value: string,
  storeId: number,
  dataId: number,
  isActive: boolean,
  createdBy: number,

}



@Component({
  selector: 'app-onboardstore',
  templateUrl: './onboardstore.component.html',
  styleUrls: ['./onboardstore.component.scss']
})
export class OnboardstoreComponent {



  
  
  isLoading: boolean = false;
  openingdata: any;

  public formClosing = new FormGroup({
    closingCashId: new FormControl(0),
    storeId: new FormControl(0, Validators.required),
    amount: new FormControl('', Validators.required),
    amountDate: new FormControl('2024-05-08', Validators.required),
    isActive: new FormControl(true),
    createdBy: new FormControl(0),
  });

  public form = new FormGroup({
    storeDataId: new FormControl(0),
    value1: new FormControl(''),
    value: new FormControl(''),
    storeId: new FormControl(0),
    dataId: new FormControl(0),
    isActive: new FormControl(true),
    createdBy: new FormControl(0),
  });



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

  constructor(private router: Router, private authService: AuthService, private route: ActivatedRoute,
    private http: HttpService, private toastr: ToastrService) {

  }
  edit: boolean = false;
  storeId: any;
  ngOnInit() {


    this.storeId = this.route.snapshot.params["storeId"];
    this.GetStoreOpeningDetailById(this.storeId);
    this.GetDataDetail();
    this.GetStoreDetailAll(this.storeId);

    this. GetBalanceSheetTerm();
    this.formA.patchValue({
      storeId: this.storeId,
      fromDate: this.fromDate,
      toDate: this.toDate,
    });
    this.GetBalanceSheetByStoreId(this.storeId, this.formA.value.fromDate, this.formA.value.toDate);
  }

  storedetail: any;
  GetStoreDetailAll(storeId: any) {
    this.http.getAll(environment.GetStoreDetail).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        console.log(result.data)
        this.storedetail = result.data.filter((x: { storeId: any; }) => x.storeId == storeId);
      }
      else {
        this.storedetail = null;
      }
    })
  }


  previousDateFromSelected: any;
  onSubmitClosing() {

    let dateString = this.formClosing.value.amountDate;
    let dateObject: Date | null = null;

    if (dateString) {
      dateObject = new Date(dateString);
    }

    if (dateObject) {
      this.previousDateFromSelected = this.calculatePreviousDate(dateObject);
    } else {
      // Handle the case where dateObject is null (optional)
      console.error("Invalid date string:", dateString);
    }

    if (this.formClosing.value.amount == '' || this.formClosing.value.amount == '0') {
      return;
    }
    console.log(this.formClosing.value);
    if (this.formClosing.invalid) {
      this.isLoading = false;
      return;
    }
    this.formClosing.value.storeId = this.storeId;
    this.formClosing.value.amountDate = this.previousDateFromSelected;
    this.http.post(environment.SaveOpeningBalance, this.formClosing.value).subscribe((result: any) => {
      if (result.isSuccess == 1) {

        console.log(result.data);
        // this.storeclosingdata = result.data;
        this.reset();
        this.toastr.success(result.message);
        this.GetStoreOpeningDetailById(this.storeId);
      }
      else {
        //  this.toastr.error(result.message);
      }
    });
  }

  reset() {
    if (this.openingdata != null) {
      this.edit = true;

    } else {
      this.formClosing.patchValue({
        storeId: this.storeId,
        amount: '',
        amountDate: '',
        isActive: true,
        createdBy: 0,

      });

    }
  }
  openingamountdate: any;
  GetStoreOpeningDetailById(pStoreId: any) {

    this.http.getAll(environment.GetStoreOpeningDetailById + "?pStoreId=" + pStoreId).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        console.log(result.data)
        this.openingdata = result.data;
        this.edit = true;

        let dateString = this.openingdata.amountDate;

        let dateObject: Date | null = null;

        if (dateString) {
          dateObject = new Date(dateString);
        }

        if (dateObject) {
          this.openingamountdate = this.calculateNextDate(dateObject);

        } else {
          // Handle the case where dateObject is null (optional)
          console.error("Invalid date string:", dateString);
        }



      }
      else {
        this.edit = false;
        // this.insideList = null;
      }
    })
  }

  storeData: any
  GetDataDetail() {

    this.http.getAll(environment.GetDataDetailByStoreId + "?pStoreId=" + this.storeId).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        console.log('A',result.data)
        this.storeData = result.data;
      }
      else {
        this.edit = false;
        // this.insideList = null;
      }
    })
  }





  onEdit(pStoreId: any) {
    this.edit = false;
    this.formClosing.patchValue({
      storeId: this.storeId,
      amount: this.openingdata.amount,
      amountDate: this.openingdata.amountDate,
      isActive: true,
      createdBy: 0,

    });
  }

  formatDate(date: Date): string {
    const yyyy = date.getFullYear();
    const mm = ('0' + (date.getMonth() + 1)).slice(-2);
    const dd = ('0' + date.getDate()).slice(-2);
    return `${yyyy}-${mm}-${dd}`;
  }

  calculatePreviousDate(date: Date): string {

    date.setDate(date.getDate() - 1);
    return this.formatDate(date);
  }
  calculateNextDate(date: Date): string {

    date.setDate(date.getDate() + 1);
    return this.formatDate(date);
  }

  onSave(item: any) {
    this.form.value.dataId = item.dataId;
    this.form.value.storeId = this.storeId;
    console.log(this.form.value);

    this.http.post(environment.SaveStoreOnBoard, this.form.value).subscribe((result: any) => {
      if (result.isSuccess == 1) {

        console.log(result.data);
        // this.storeclosingdata = result.data;
        this.resetForm();
        this.toastr.success(result.message);
        this.GetDataDetail();
      }
      else {
        //  this.toastr.error(result.message);
      }
    });



  }
  resetForm() {
  
      this.form.patchValue({
        storeId: this.storeId,
        value: '',
        value1: '',
        isActive: true,
        createdBy: 0,
      });

    
  }
  

  onEditData(item :any)
  {
    console.log(item);
   
item.modifiedBy = 1;
//this.form.value.value = item.value;
this.form.patchValue({
  value : item.value,
})
console.log(this.form.value);
  }


  onBack()
  {
    this.router.navigateByUrl('/admin/managestore');
  }



      ///////////////////////////////
    
      public formA = new FormGroup({
        storeId: new FormControl(0),
        fromDate: new FormControl(''),
        toDate: new FormControl(''),
      });
      public formB = new FormGroup({
        storeId: new FormControl(0),
        periodDateFrom: new FormControl(''),
        periodDateTo: new FormControl(''),
    
        btype: new FormControl(''),
        bsitemId: new FormControl(0),
        balanceSheetId: new FormControl(0),
        termsId: new FormControl(0),
        name: new FormControl(''),
        amount: new FormControl(0),
        entryDate: new FormControl(''),
        isActive: new FormControl(true),
        createdBy: new FormControl(0),
      });


      onSubmit() {

        this.formA.patchValue({
          storeId: this.storeId,
          fromDate: this.fromDate,
          toDate: this.toDate,
        });



        this.formB.patchValue({
          storeId: this.storeId,
          periodDateFrom: this.formA.value.fromDate,
          periodDateTo: this.formA.value.toDate,
        });
        if (this.formB.value.amount == 0) {
    
          this.toastr.error('Please enter valid amount')
          return;
        }
    
        console.log(this.formA.value);
        console.log(this.formB.value);
        if (this.formB.invalid) {
    
          return;
        }
        //return;
    
        this.http.post(environment.BalanceSheet, this.formB.value).subscribe((result: any) => {
          if (result.isSuccess == 1) {
            // this.GetOtherIncomebyStoreId(this.storeid, this.entryDate);
            this.GetBalanceSheetByStoreId(this.formA.value.storeId, this.formA.value.fromDate, this.formA.value.toDate);
            // this.onReset();
            this.toastr.success(result.message);
          }
          else {
            console.log(result);
            this.toastr.error(result.message);
          }
        });
      }

      balancesheetData:any;
      GetBalanceSheetByStoreId(pStoreId: any, pFromDate: any, pToDate: any) {
 
       if (pStoreId != "" && pStoreId != null && pFromDate != "" && pFromDate != null && pToDate != "" && pToDate != null) {
   
         this.http.getAll(environment.GetBalanceSheetByStoreId + "?pStoreId=" + pStoreId + "&pFromDate=" + pFromDate + "&pToDate=" + pToDate).subscribe((result: any) => {
           if (result.isSuccess == 1) {
             console.log(result.data)
             this.balancesheetData = result.data;
   
   
           }
           else {
             this.balancesheetData = null;
           }
         })
       } else {
   
       }
     }
     entryDate:any;

     fromDate:any='2024-01-01';
     toDate:any='2024-01-01';
     termdetail: any;
  ontermschange(pid: any) {


    this.termdetail = this.termslist.filter((x: { termsType: any; }) => x.termsType == pid);
  }

  termslist: any;
  GetBalanceSheetTerm() {
    this.http.getAll(environment.GetBalanceSheetTerm).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        console.log(result.data)
        this.termslist = result.data;
      }
      else {
        // this.products = null;
      }
    })
  } 

}

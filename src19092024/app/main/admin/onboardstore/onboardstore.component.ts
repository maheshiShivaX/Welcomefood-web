import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth.service';
import { HttpService } from 'src/app/_services/http.service';
import { environment } from 'src/app/environments/environment.prod';

@Component({
  selector: 'app-onboardstore',
  templateUrl: './onboardstore.component.html',
  styleUrls: ['./onboardstore.component.scss']
})
export class OnboardstoreComponent {

  isLoading:boolean=false;
  openingdata:any;

  public formClosing = new FormGroup({
    closingCashId: new FormControl(0),
    storeId: new FormControl(0, Validators.required),
    amount: new FormControl('', Validators.required),
    amountDate: new FormControl('2024-05-08', Validators.required),
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
  edit:boolean=false;
storeId :any;
   ngOnInit() {
    this.storeId = this.route.snapshot.params["storeId"];
  this.GetStoreOpeningDetailById(this.storeId) ;
  }
  previousDateFromSelected:any;
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
    this.formClosing.value.amountDate=this.previousDateFromSelected;
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

  reset()
  {
    if( this.openingdata != null)
      {
this.edit=true;

      }else
      {
        this.formClosing.patchValue({
          storeId:this.storeId,
          amount:'',
          amountDate:'',
          isActive:true,
          createdBy:0,
          
              });

      }
  }
openingamountdate:any;
  GetStoreOpeningDetailById(pStoreId: any) {

    this.http.getAll(environment.GetStoreOpeningDetailById + "?pStoreId=" + pStoreId ).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        console.log(result.data)
        this.openingdata = result.data;
        this.edit= true;

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
        this.edit=false;
       // this.insideList = null;
      }
    })
  }
  onEdit(pStoreId: any)
  {
    this.edit=false;
    this.formClosing.patchValue({
storeId:this.storeId,
amount:this.openingdata.amount,
amountDate:this.openingdata.amountDate,
isActive:true,
createdBy:0,

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

}

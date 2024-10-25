import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth.service';
import { HttpService } from 'src/app/_services/http.service';
import { environment } from 'src/app/environments/environment.prod';

@Component({
  selector: 'app-creditcard',
  templateUrl: './creditcard.component.html',
  styleUrls: ['./creditcard.component.scss']
})
export class CreditcardComponent {
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

  entryDate: string | undefined;
  dated:any;
  constructor(private router: Router, private authService: AuthService, private route: ActivatedRoute,
    private http: HttpService, private toastr: ToastrService) {
    this.entryDate = new Date().toISOString().split('T')[0];

 


    this.dated = this.entryDate;

    // this.storesdata[0].storeid = this.storeId;
    // this.storesdata[0].fromdate = this.dated;
    // this.storesdata[0].todate=this.dated

  }
  storeId:any;
  ngOnInit() {
    this.storeId = this.route.snapshot.params["storeId"];
    localStorage.setItem("storeid",this.storeId);

    this.dated = this.entryDate;

this.  GetCreditCardByStoreIdDate();
  }

creditcardamount:any;
creditcardlist:any;
GetCreditCardByStoreIdDate() {

  this.http.getAll(environment.GetCreditCardByStoreIdDate+ "?pStoreId=" + this.storeId + "&pAmountDate=" + this.entryDate ).subscribe((result: any) => {
    if (result.isSuccess == 1) {
      console.log(result.data)
      this.creditcardlist = result.data;

      this.creditcardamount  = this.creditcardlist.reduce((acc: any, item: { amount: any; }) => acc + (item.amount || 0), 0);


    }
    else {
      this.creditcardlist = null;
    }
  })
}


public formCreditcard = new FormGroup({
  ccamountId: new FormControl(0),
  creditCardId: new FormControl(0, Validators.required),
  storeId: new FormControl(0, Validators.required),
  amount: new FormControl('', Validators.required),
  description: new FormControl('', Validators.required),
  amountDate: new FormControl('', Validators.required),
  isActive: new FormControl(true),
  createdBy: new FormControl(0),
});



onTextboxCreditLeave(event: Event, row: any): void {


    


  const inputElement = event.target as HTMLInputElement;
  console.log('Textbox value on leave:', inputElement.value);



  this.formCreditcard.patchValue({
      storeId: this.storeId,
      amountDate: this.entryDate,
      amount: inputElement.value,
      creditCardId:row.creditCardId,
      isActive: true,
      createdBy: 0,
    })
  this.onSubmitCreditCard();
  // Add your logic here
}

creditcarddata:any;
  onSubmitCreditCard() {


    if (this.formCreditcard.value.amount== '' || this.formCreditcard.value.amount == '0') {
      return;
    }
    console.log(this.formCreditcard.value);


    this.http.post(environment.SaveCreditCardDetail, this.formCreditcard.value).subscribe((result: any) => {
      if (result.isSuccess == 1) {

        console.log(result.data);
        this.creditcarddata = result.data;
        
        this.  GetCreditCardByStoreIdDate();

      }
      else {
        //  this.toastr.error(result.message);
      }
    });
  }


}

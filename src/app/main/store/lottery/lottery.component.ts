import { Component, Input, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/_services/auth.service';
import { HttpService } from 'src/app/_services/http.service';
import { TriggerdailyService } from 'src/app/_services/triggerdaily.service';
import { environment } from 'src/app/environments/environment.prod';

@Component({
  selector: 'app-lottery',
  templateUrl: './lottery.component.html',
  styleUrls: ['./lottery.component.scss']
})
export class LotteryComponent {
  @Input() storesdata: { storeid: string; fromdate: string, todate :string }[] = [];
  entryDate:any;
  selectedOption:any;
  companyId:any;
  storeId:any;

  ngOnChanges(changes: SimpleChanges) {
    console.log('s');
    if (changes['storesdata']) {
      console.log('Stores data has been updated:', this.storesdata);
      // Additional logic to handle the new data can go here
    }
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
  private dataChangeSubscription: Subscription;
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
      if(menutype=='8')
      {
        this.storeId =localStorage.getItem("storeid");
        this.entryDate =localStorage.getItem("tentrydate") 
       this.GetLotteryTypeStoreIdDate();
       this.GetLotteryExpenseStoreIdDate();
      }
      
    });


  }
  storeid:any;

  ngOnInit() {
   
  

    this.storeId =this.storesdata[0].storeid;// localStorage.getItem("storeid");
    //this.tstoreid =this.storesdata[0].storeid;// localStorage.getItem("tStoreId");
    this.entryDate = this.storesdata[0].fromdate; //localStorage.getItem("tfromdate");
  console.log(this.entryDate);

    //this.storeId = localStorage.getItem("storeid");
    
   this.GetLotteryTypeStoreIdDate();
   this.GetLotteryExpenseStoreIdDate();
  }
  drawNumbers()
  {
    alert('ds');
  }

  
lotterytype:any
lotteryamount:any;
lotteryamountExpense:any;
lotterytypeExpense:any;

GetLotteryTypeStoreIdDate() {
  this.http.getAll(environment.GetLotteryTypeStoreIdDate + "?pStoreId=" + this.storeId  + "&pAmountDate=" + this.entryDate).subscribe((result: any) => {
    if (result.isSuccess == 1) {
      console.log(result.data)
      this.lotterytype = result.data;


//       this.lotteryamount  = this.lotterytype.reduce((acc: any, item: { lotteryAmount: any; }) => acc + (item.lotteryAmount || 0), 0);
// alert(this.lotteryamount);

this.lotteryamount = (this.lotterytype.reduce((acc: number, item: { lotteryAmount: string }) => {
  // Convert the lotteryAmount to a number, defaulting to 0 if it's not a valid number
  const amount = parseFloat(item.lotteryAmount) || 0; 
  return acc + amount;
}, 0)).toFixed(2);

    }
    else {
      this.lotterytype = null;
    }
  })
}
GetLotteryExpenseStoreIdDate() {
  this.http.getAll(environment.GetLotteryExpenseStoreIdDate + "?pStoreId=" + this.storeId  + "&pAmountDate=" + this.entryDate).subscribe((result: any) => {
    if (result.isSuccess == 1) {
      console.log(result.data)
      this.lotterytypeExpense = result.data;


      //this.lotteryamountExpense  = this.lotterytypeExpense.reduce((acc: any, item: { lotteryAmount: any; }) => acc + (item.lotteryAmount || 0), 0);

      this.lotteryamountExpense = (this.lotterytypeExpense.reduce((acc: number, item: { lotteryAmount: string }) => {
        // Convert the lotteryAmount to a number, defaulting to 0 if it's not a valid number
        const amount = parseFloat(item.lotteryAmount) || 0; 
        return acc + amount;
      }, 0)).toFixed(2);

    }
    else {
      this.lotterytype = null;
    }
  })
}
public formLottery = new FormGroup({
  lotteryPayId: new FormControl(0),
  lotteryAmount: new FormControl('', Validators.required),
  storeId: new FormControl(0, Validators.required),
  lotteryTypeId: new FormControl(0, Validators.required),
  amountDate: new FormControl('', Validators.required),
  isActive: new FormControl(true),
  createdBy: new FormControl(0),
});
  
onTextboxLotteryLeave(event: Event, row: any): void {


    


  const inputElement = event.target as HTMLInputElement;
  console.log('Textbox value on leave:', inputElement.value);



  this.formLottery.patchValue({
      storeId: this.storeId,
      amountDate: this.entryDate,
      lotteryAmount: inputElement.value,
      lotteryTypeId:row.lotteryTypeId,
      isActive: true,
      createdBy: 0,
    })
  this.onSubmitLottery();
  // Add your logic here
}
onSubmitLottery() {


  if (this.formLottery.value.lotteryAmount== '' || this.formLottery.value.lotteryAmount == '0') {
    return;
  }
  console.log(this.formLottery.value);


  this.http.post(environment.SaveLotteryPayDetail, this.formLottery.value).subscribe((result: any) => {
    if (result.isSuccess == 1) {

      console.log(result.data);
     // this.lotterytype = result.data;


    
      
      this.  GetLotteryTypeStoreIdDate();
      this.  GetLotteryExpenseStoreIdDate();

    }
    else {
      //  this.toastr.error(result.message);
    }
  });
}
 
}

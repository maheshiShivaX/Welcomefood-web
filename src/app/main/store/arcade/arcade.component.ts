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
  selector: 'app-arcade',
  templateUrl: './arcade.component.html',
  styleUrls: ['./arcade.component.scss']
})
export class ArcadeComponent {

  @Input() storesdata: { storeid: string; fromdate: string, todate :string }[] = [];


  entryDate: any;
  selectedOption: any;
  companyId: any;
  storeId: any;


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
    private http: HttpService, private toastr: ToastrService,private dataService: TriggerdailyService,) {
    this.entryDate = new Date().toISOString().split('T')[0];
    this.selectedOption = 1;

    this.authService.currentUser.subscribe((user) => {
      const currentUser = user;
      // this.formExpense.value.createdBy = currentUser.loginId;
      this.companyId = currentUser.companyId;

    });

    this.dataChangeSubscription = this.dataService.dataChange$.subscribe((menutype: any) => {
    
      if(menutype=='13')
      {
        this.storeid =localStorage.getItem("storeid");
        this.entryDate =localStorage.getItem("tentrydate") 

        this.GetArcadeDetailByStoreDate();

      }
      
    });

  }
  storeid: any;

  ngOnInit() {

   // this.storeId = localStorage.getItem("storeid");

    
   // alert('asdf');
   this.storeId =this.storesdata[0].storeid;// localStorage.getItem("storeid");
   //this.tstoreid =this.storesdata[0].storeid;// localStorage.getItem("tStoreId");
   this.entryDate = this.storesdata[0].fromdate; //localStorage.getItem("tfromdate");
   //this.ttodate =this.storesdata[0].todate;


    this.GetArcadeDetailByStoreDate();
  }

  inamount1: any='0.00';
  outamount1: any='0.00';


  inamount: any='';
  outamount: any='';
  lotterytype: any
  lotteryamount: any;
  lotteryamountExpense: any;
  lotterytypeExpense: any;
  arcatedata: any;
  GetArcadeDetailByStoreDate() {
    this.http.getAll(environment.GetArcadeDetailByStoreDate + "?pStoreId=" + this.storeId + "&pAmountDate=" + this.entryDate).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        
        this.arcatedata = result.data;

        var res1 = this.arcatedata.filter((x: { payType: number; }) => x.payType == 1)
        if (res1 != null && res1.length > 0) {
          this.inamount = res1[0].amount.toFixed(2);
          this.inamount1 = res1[0].amount.toFixed(2);
        }
        else{
          this.inamount1='0.00';
        }
        var res2 = this.arcatedata.filter((x: { payType: number; }) => x.payType == 2)

        if (res2 != null && res2.length > 0) {
          this.outamount = res2[0].amount.toFixed(2);
          this.outamount1= res2[0].amount.toFixed(2);
        }else{
          this.outamount1='0.00';
        }
        //  this.inamount = this.arcatedata.filter((x: { payType: number; }) => x.payType == 1)[0].amount
        //  this.outamount = this.arcatedata.filter((x: { payType: number; }) => x.payType == 2)[0].amount
      }
      else {
        this.inamount1='0.00';
        this.outamount1='0.00';
        this.lotterytype = null;
      }
    })
  }



  public form = new FormGroup({
    coamId: new FormControl(0),
    storeId: new FormControl(0, Validators.required),
    amount: new FormControl(''),
    payType: new FormControl(0, Validators.required),
    amountDate: new FormControl('', Validators.required),
    isActive: new FormControl(true),
    createdBy: new FormControl(0),
  });



  onTextboxLeave(event: Event, paytype: any): void {

    const inputElement = event.target as HTMLInputElement;
   

    if (inputElement.value == '' || inputElement.value == '0') {

      this.http.getAll(environment.DeleteArcadeDetailByStoreIdPayId + "?pStoreId=" + this.storeId + "&pAmountDate=" + this.entryDate + "&pPayType=" + paytype).subscribe((result: any) => {
        if (result.isSuccess == 1) {
          
          this.GetArcadeDetailByStoreDate();

        }
        else {
          this.GetArcadeDetailByStoreDate();
        }
      })

    } else {
      this.form.patchValue({
        storeId: this.storeId,
        amountDate: this.entryDate,
        payType: paytype,
        coamId: 0,
        amount: inputElement.value,
        isActive: true,
        createdBy: 0,
      })
      this.onSubmit();
    }


    // Add your logic here
  }






  onSubmit() {


    if (this.form.value.amount == '' || this.form.value.amount == '0') {
      return;
    }
   ;


    this.http.post(environment.SaveArcadeDetail, this.form.value).subscribe((result: any) => {
      if (result.isSuccess == 1) {

        ;
        this.GetArcadeDetailByStoreDate();


      }
      else {
        //  this.toastr.error(result.message);
      }
    });
  }

}


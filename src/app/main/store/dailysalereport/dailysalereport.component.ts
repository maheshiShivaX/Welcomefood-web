import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth.service';
import { HttpService } from 'src/app/_services/http.service';
import { MonthService } from 'src/app/_services/month.service';
import { environment } from 'src/app/environments/environment.prod';

@Component({
  selector: 'app-dailysalereport',
  templateUrl: './dailysalereport.component.html',
  styleUrls: ['./dailysalereport.component.scss']
})
export class DailysalereportComponent {

  paymentOptions: { label: string; fromdate: string; todate: string; }[]=[] ;

  
  public form = new FormGroup({
    storeId: new FormControl(0),
    fromDate: new FormControl(''),
    toDate: new FormControl(''),
    month:new FormControl('')
  });
  loginId:any;
  fromDate:any;
  toDate:any;
  datelist:any;
  constructor(private router: Router, private authService: AuthService, private route: ActivatedRoute,private monthService: MonthService,
    private http: HttpService, private toastr: ToastrService
  ) {
    this.authService.currentUser.subscribe((user) => {

      console.log(user);
      const currentUser = user;
      this.loginId = currentUser.loginId;
      // Update menu based on user authentication state
    });


    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = ('0' + (today.getMonth() + 1)).slice(-2); // Add leading zero, month starts at 0
    const dd = ('0' + today.getDate()).slice(-2); // Add leading zero
    this.fromDate= `${yyyy}-${mm}-${dd}`;
     this.toDate = `${yyyy}-${mm}-${dd}`;

  }
  ngOnInit() {
  
    const today = new Date();
    const yyyy = today.getFullYear();
    console.log(yyyy);
    //const year = 2024; // You can change this dynamically or make it user-input
    this.paymentOptions = this.monthService.getPaymentOptions(yyyy);
    this.GetEmployeeStoreByUserId();
   // this.route.snapshot.params["storeId"];
    



  }
  onGetReport()
  {
    this.datelist=this.paymentOptions.filter(x=>x.label==this.form.value.month)[0]
    this.form.patchValue({
    
      fromDate: this.datelist.fromdate,
      toDate:this.datelist.todate
    });

    this.fromDate =this.datelist.fromdate;
this.toDate=this.datelist.todate

this.DailySaleReportDatewise(this.form.value.storeId, this.form.value.fromDate, this.form.value.toDate)
    
  }
  storeList:any;
  GetEmployeeStoreByUserId() {

    this.http.getAll(environment.GetEmployeeStoreByUserId +"?pUserId=" + this.loginId ).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        console.log(result.data)
        this.storeList = result.data;
     
       
      }
      else { this.storeList = null;
      }
    })
  }
  dailydata:any;
tinsideSale:any;
tsaleTax:any;
tgasGallon:any;
tgasAmount:any;
tlotteryTotal:any;
tcreditCard:any;
tcoamIn:any;
tcoamOut:any;
tnetCoam:any;




  DailySaleReportDatewise(pStoreId: any, pFromDate: any, pToDate: any) {

    if (pStoreId != "" && pStoreId != null && pFromDate != "" && pFromDate != null && pToDate != "" && pToDate != null) {

      this.http.getAll(environment.DailySaleReportDatewise + "?pStoreId=" + pStoreId + "&pFromDate=" + pFromDate + "&pToDate=" + pToDate).subscribe((result: any) => {
        if (result.isSuccess == 1) {
          console.log(result.data)
          this.dailydata = result.data;

          this.tinsideSale= this.dailydata.reduce((acc: any, item: { insideSale: any; }) => acc + (item.insideSale || 0), 0);;
          this.tsaleTax= this.dailydata.reduce((acc: any, item: { saleTax: any; }) => acc + (item.saleTax || 0), 0);;
          this.tgasGallon= this.dailydata.reduce((acc: any, item: { gasGallon: any; }) => acc + (item.gasGallon || 0), 0);;
          this.tgasAmount= this.dailydata.reduce((acc: any, item: { gasAmount: any; }) => acc + (item.gasAmount || 0), 0);;
          this.tlotteryTotal=this.dailydata.reduce((acc: any, item: { lotteryTotal: any; }) => acc + (item.lotteryTotal || 0), 0);;
          this.tcreditCard=this.dailydata.reduce((acc: any, item: { creditCard: any; }) => acc + (item.creditCard || 0), 0);;
          this.tcoamIn=this.dailydata.reduce((acc: any, item: { coamIn: any; }) => acc + (item.coamIn || 0), 0);;
          this. tcoamOut=this.dailydata.reduce((acc: any, item: { coamOut: any; }) => acc + (item.coamOut || 0), 0);;
          this.tnetCoam=this.dailydata.reduce((acc: any, item: { netCoam: any; }) => acc + (item.netCoam || 0), 0);;

        }
        else {
          this.dailydata = null;
        }
      })
    } else {

    }
  }
}

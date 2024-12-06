import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth.service';
import { HttpService } from 'src/app/_services/http.service';
import { TriggerdailyService } from 'src/app/_services/triggerdaily.service';
import { environment } from 'src/app/environments/environment.prod';


@Component({
  selector: 'app-dailysalesheet',
  templateUrl: './dailysalesheet.component.html',
  styleUrls: ['./dailysalesheet.component.scss']
})
export class DailysalesheetComponent {
 parsedValue: string = '';
control = new FormControl(null);

  loginId:any;
  storedetail:any;
  storeid:any;

  fromDate:any;
  toDate:any;
  constructor(private router: Router, private authService: AuthService, private route: ActivatedRoute,
    private http: HttpService, private toastr: ToastrService, private dataService: TriggerdailyService,
  ) {
    this.authService.currentUser.subscribe((user) => {


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

  storesdata = [
    { storeid: 'Job', fromdate: 'fdg', todate:'dfg' }
  ];

  public form = new FormGroup({
    storeId: new FormControl(0),
    fromDate: new FormControl(''),
    toDate: new FormControl(''),
  });


   // =============================================================================
   ngOnInit() {
  

    this.GetEmployeeStoreByUserId();
   // this.route.snapshot.params["storeId"];
    

  }

 
isView:boolean=false;
  storeList:any
  // fromDate:any;
  // toDate:any;

  storeId:any;
  fromDates:any;
  toDates:any;
range:any
  formatDateToYYYYMMDD(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month (1-based)
    const day = String(date.getDate()).padStart(2, '0'); // Get day (with leading zero if needed)

    // Return formatted date in yyyy-MM-dd
    return `${year}-${month}-${day}`;
  }
  onGetReport()
  {


     this.range = this.control.value;
    if (this.range ) {

    }

    this.form.patchValue({

      fromDate:this.formatDateToYYYYMMDD(this.range[0]),
      toDate:this.formatDateToYYYYMMDD(this.range[0])
    });

   this.storeId = this.form.value.storeId;
   this.fromDates=this.formatDateToYYYYMMDD(this.range[0]);
   this.toDates =this.formatDateToYYYYMMDD(this.range[1]);
 
    if(this.storeId!=null &&  this.fromDates!=null && this.toDates!=null)
    {
     ;
      this.storesdata[0].storeid = this.storeId;
      this.storesdata[0].fromdate = this.fromDates;
      this.storesdata[0].todate=this.toDates
      localStorage.setItem("tentrydate",this.fromDates);
      localStorage.setItem("tlastdate",this.toDates);
      this.dataService.triggerDataChange('6');
    this.isView= true;
    }
  }


  GetEmployeeStoreByUserId() {

    this.http.getAll(environment.GetEmployeeStoreByUserId +"?pUserId=" + this.loginId ).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        
        this.storeList = result.data;
     
       
      }
      else { this.storeList = null;
      }
    })
  }


}

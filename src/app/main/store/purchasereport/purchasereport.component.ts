import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth.service';
import { HttpService } from 'src/app/_services/http.service';
import { MonthService } from 'src/app/_services/month.service';
import { environment } from 'src/app/environments/environment.prod';

@Component({
  selector: 'app-purchasereport',
  templateUrl: './purchasereport.component.html',
  styleUrls: ['./purchasereport.component.scss']
})
export class PurchasereportComponent {


  loginId:any;
  storedetail:any;
  storeid:any;

  fromDate:any;
  toDate:any;
  paymentService: any;
  constructor(private router: Router, private authService: AuthService, private route: ActivatedRoute,private monthService: MonthService,
    private http: HttpService, private toastr: ToastrService
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

  name = 'Angular';
  modelDate!: Date;

  onOpenCalendar(container:any) {
    container.monthSelectHandler = (event: any): void => {
      container._store.dispatch(container._actions.select(event.date));
   
    };     
    container.setViewMode('month');
  
  }

  public form = new FormGroup({
    storeId: new FormControl(0),
    fromDate: new FormControl(''),
    toDate: new FormControl(''),
    month: new FormControl(''),
    payMode: new FormControl(0)
  });


   // =============================================================================
   ngOnInit() {
    const today = new Date();
    const yyyy = today.getFullYear();
 
    //const year = 2024; // You can change this dynamically or make it user-input
    this.paymentOptions = this.monthService.getPaymentOptions(yyyy);
    this.GetPayMode(); 
    this.GetEmployeeStoreByUserId();
   // this.route.snapshot.params["storeId"];
  }

  paymentOptions: { label: string; fromdate: string; todate: string; }[]=[] ;




  vendorCategoryAmountscase:any;
  vendorCategoryAmountscheque:any;
  categories: any;
  totalAmounts: { [key: string]: number } = {};
  totalAmountscheque: { [key: string]: number } = {};
  totalamountpurchasecash: number = 0;
  totalamountpurchasecheque: number = 0;
  calculateTotalAmounts(): void {
    this.totalAmounts = {};
    for (let category of this.categories) {
      this.totalAmounts[category] = this.vendorCategoryAmountscase.reduce((sum: any, item: { amounts: { [x: string]: any; }; }) => sum + (item.amounts[category] || 0), 0);
      this.totalamountpurchasecash = this.totalamountpurchasecash + (+this.totalAmounts[category]);
    }
  }

  title:any;
  getTotalAmountForVendor(vendor: any): number {
    return this.categories.reduce((sum: any, category: string | number) => sum + (vendor.amounts[category] || 0), 0);
  }

  GetPLStoreDetail(pStoreId: any, pFromDate: any,pToDate :any, pPayType:any) {

    this.http.getAll(environment.GetItemPurchaseByStoreIdDateWise + "?pStoreId=" + pStoreId + "&pFromDate=" + pFromDate + "&pToDate=" + pToDate + "&pPayType="+pPayType).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        
        this.storedetail = result.data;

        this.title = this.paymode.filter((x: { payModeId: number | null | undefined; })=>x.payModeId==this.form.value.payMode)[0].payModeName ;
        this.vendorCategoryAmountscase = this.storedetail;
        if (this.vendorCategoryAmountscase.length > 0) {
          this.categories = Object.keys(this.vendorCategoryAmountscase[0].amounts);
        }
        this.calculateTotalAmounts();

        
      }
      else {
        this.storedetail = null;
      }
    })
  }

  storeList:any
  // fromDate:any;
  // toDate:any;


  GetEmployeeStoreByUserId() {

    this.http.getAll(environment.GetEmployeeStoreByUserId +"?pUserId=" + this.loginId ).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        
        this.storeList = result.data;
     
       
      }
      else { this.storeList = null;
      }
    })
  }


  GetStoreDetailAll() {
    this.http.getAll(environment.GetStoreDetail).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        
        this.storeList = result.data;
      }
      else {
        this.storeList = null;
      }
    })
  }
  storename:any;

  datelist:any;

  formatDateToYYYYMMDD(date:Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month (1-based)
    const day = String(date.getDate()).padStart(2, '0'); // Get day (with leading zero if needed)
    
    // Return formatted date in yyyy-MM-dd
    return `${year}-${month}-${day}`;
}

  onGetReport()
  {



const year = this.modelDate.getFullYear();
const month = this.modelDate.getMonth(); // getMonth() gives 0-based month (0 for Jan, 11 for Dec)

// First date of the month (set to the 1st day of the month)
const firstDate = new Date(year, month, 1);

// Last date of the month (set to the last day of the month)
// Set the date to the 1st day of the next month and subtract one day
const lastDate = new Date(year, month + 1, 0);

    //this.datelist=this.paymentOptions.filter(x=>x.label==this.form.value.month)[0]
this.form.patchValue({

  fromDate: this.formatDateToYYYYMMDD(firstDate),
  toDate:this.formatDateToYYYYMMDD(lastDate),
});

this.fromDate =this.formatDateToYYYYMMDD(firstDate),
this.toDate=this.formatDateToYYYYMMDD(lastDate)







   ;

this.storename = this.storeList.filter((x: { storeId: number | null | undefined; })=>x.storeId==this.form.value.storeId)[0].storeName
    this.GetPLStoreDetail(this.form.value.storeId, this.form.value.fromDate,this.form.value.toDate, this.form.value.payMode)

    this.reporttype='purchasecash';
  }

  reporttype:any;
  onChange(reporttype :any)
  {

  this.reporttype=reporttype;
}

paymode:any;
GetPayMode() {

  this.http.getAll(environment.GetPayMode).subscribe((result: any) => {
    if (result.isSuccess == 1) {
      
      this.paymode = result.data;

      
      const newEntry =   {
        modifiedBy: 0,
        createdDate: "2024-05-13T00:00:00",
        modifiedDate: "2024-05-13T00:00:00",
        isDeleted: false,
        payModeId: 0,
        payModeName: "ALL",
        isActive: true,
        createdBy: 0
      };
      this.paymode.unshift(newEntry);


    }
    else {
      this.paymode = null;
    }
  })
}

onPaymodechange(d:any) {
  // alert(this.selectedOption);
}

downloadExcel(id:any) {
  // let element = document.getElementById('tabellistcs');
  // const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
  // const wb: XLSX.WorkBook = XLSX.utils.book_new();
  // XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  // XLSX.writeFile(wb, 'table_data.xlsx');


  var data = '';
  data = document.getElementById('purchasereport')!.innerHTML;
  //const data = document.getElementById('pdfTable')!.innerHTML;
  const dataType = 'data:application/vnd.ms-excel';
  const tableHTML = encodeURIComponent(data);

  // Create download link element
  const downloadLink = document.createElement("a");
  document.body.appendChild(downloadLink);

  // Create a link to the file
  downloadLink.href = `${dataType}, ${tableHTML}`;

  // Setting the file name
  downloadLink.download = 'purchasereport' + '.xls';

  //triggering the function
  downloadLink.click();

  // Remove the download link after downloading
  document.body.removeChild(downloadLink);


  // let element = document.getElementById('tblUnit'); 
  // const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

  // /* generate workbook and add the worksheet */
  // const wb: XLSX.WorkBook = XLSX.utils.book_new();
  // XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  // /* save to file */
  // XLSX.writeFile(wb, "UnitType.xlsx");
}

  }



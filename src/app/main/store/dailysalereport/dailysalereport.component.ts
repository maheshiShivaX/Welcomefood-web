import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth.service';
import { HttpService } from 'src/app/_services/http.service';
import { MonthService } from 'src/app/_services/month.service';
import { environment } from 'src/app/environments/environment.prod';
import * as XLSX from 'xlsx';
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





  formatDateToYYYYMMDD(date:Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month (1-based)
    const day = String(date.getDate()).padStart(2, '0'); // Get day (with leading zero if needed)
    
    // Return formatted date in yyyy-MM-dd
    return `${year}-${month}-${day}`;
}

  onGetReport()
  {

console.log(this.modelDate);

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


storename:any;

  DailySaleReportDatewise(pStoreId: any, pFromDate: any, pToDate: any) {

    if (pStoreId != "" && pStoreId != null && pFromDate != "" && pFromDate != null && pToDate != "" && pToDate != null) {

      this.http.getAll(environment.DailySaleReportDatewise + "?pStoreId=" + pStoreId + "&pFromDate=" + pFromDate + "&pToDate=" + pToDate).subscribe((result: any) => {
        if (result.isSuccess == 1) {
          console.log(result.data)
          this.dailydata = result.data;

        //  this.tinsideSale= this.dailydata.reduce((acc: any, item: { insideSale: number; }) => acc + (item.insideSale || 0), 0);;
          this.tinsideSale =( this.dailydata.reduce((acc: number, item: { insideSale: string }) => { const insideSaleValue = +item.insideSale || 0; return acc + insideSaleValue;}, 0)).toFixed(2);
          this.tsaleTax= (this.dailydata.reduce((acc: number, item: { saleTax: string; }) => { const saleTaxValue = +item.saleTax || 0; return acc + saleTaxValue;}, 0)).toFixed(2);
          this.tgasGallon= (this.dailydata.reduce((acc: number, item: { gasGallon: string; }) => { const gasGallonValue = +item.gasGallon || 0; return acc + gasGallonValue;}, 0)).toFixed(2);
          this.tgasAmount= (this.dailydata.reduce((acc: number, item: { gasAmount: string; }) => { const gasAmountValue = +item.gasAmount || 0; return acc + gasAmountValue;}, 0)).toFixed(2);
          this.tlotteryTotal=(this.dailydata.reduce((acc: number, item: { lotteryTotal: string; }) => { const lotteryTotalValue = +item.lotteryTotal || 0; return acc + lotteryTotalValue;}, 0)).toFixed(2);
          this.tcreditCard=(this.dailydata.reduce((acc: number, item: { creditCard: string; }) => { const creditCardValue = +item.creditCard || 0; return acc + creditCardValue;}, 0)).toFixed(2);
          this.tcoamIn=(this.dailydata.reduce((acc: number, item: { coamIn: string; }) => { const coamInValue = +item.coamIn || 0; return acc + coamInValue;}, 0)).toFixed(2);
          this. tcoamOut=(this.dailydata.reduce((acc: number, item: { coamOut: string; }) => { const coamOutValue = +item.coamOut || 0; return acc + coamOutValue;}, 0)).toFixed(2);
          this.tnetCoam=(this.dailydata.reduce((acc: number, item: { netCoam: string; }) => { const netCoamValue = +item.netCoam || 0; return acc + netCoamValue;}, 0)).toFixed(2);

          this.storename =  this.storeList.filter((x: { storeId: any; })=>x.storeId==pStoreId)[0].storeName;
        }
        else {
          this.dailydata = null;
        }
      })
    } else {

    }
  }

  name = 'Angular';
  modelDate!: Date;

  onOpenCalendar(container:any) {
    container.monthSelectHandler = (event: any): void => {
      container._store.dispatch(container._actions.select(event.date));
   
    };     
    container.setViewMode('month');
  
  }
  
  downloadExcel(id:any) {
    // let element = document.getElementById('tabellistcs');
    // const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    // const wb: XLSX.WorkBook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    // XLSX.writeFile(wb, 'table_data.xlsx');


    var data = '';
    data = document.getElementById('dailysalereport')!.innerHTML;
    //const data = document.getElementById('pdfTable')!.innerHTML;
    const dataType = 'data:application/vnd.ms-excel';
    const tableHTML = encodeURIComponent(data);

    // Create download link element
    const downloadLink = document.createElement("a");
    document.body.appendChild(downloadLink);

    // Create a link to the file
    downloadLink.href = `${dataType}, ${tableHTML}`;

    // Setting the file name
    downloadLink.download = 'dailysalereport' + '.xls';

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


  excelDownload(name: any) {
    let element = document.getElementById(name);
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

  //   // Example of manually setting the styles for the header
  // const headerRange = { s: { r: 0, c: 0 }, e: { r: 0, c: 9 } }; // Range for the first row (header)
  // ws['!rows'] = [{ hpt: 25 }];
  // ws['!cols'] = Array(10).fill({ wch: 15 }); // Set column width

  // // Set header row to be bold and center-aligned
  // for (let col = 0; col <= 9; col++) {
  //   const cell = ws[XLSX.utils.encode_cell({ r: 0, c: col })];
  //   if (!cell) continue;
  //   cell.s = {
  //     font: { bold: true },
  //     alignment: { horizontal: 'center', vertical: 'center' }
  //   };
  // }

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, name + '.xlsx');
  }

}

import { Component, ElementRef, Renderer2 } from '@angular/core';

import * as CanvasJS from '@canvasjs/charts';
import { AuthService } from 'src/app/_services/auth.service';
import { HttpService } from 'src/app/_services/http.service';
import { environment } from 'src/app/environments/environment.prod';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {


  loginId:any;
  companyId:any;
  constructor(private http: HttpService,private el: ElementRef, private renderer: Renderer2, private authService: AuthService,) { 
    this.authService.currentUser.subscribe((user) => {
    //  console.log(user);
      const currentUser = user;
      this.loginId=currentUser.loginId;
      this.companyId= currentUser.companyId;
      // Update menu based on user authentication state
    });
   }

  removeInlineStyle() {
    const elements = this.el.nativeElement.querySelectorAll('.canvasjs-chart-credit');
    elements.forEach((element: HTMLElement) => {
      this.renderer.removeStyle(element, 'position'); // Remove position style
      this.renderer.removeStyle(element, 'top'); // Remove top style (or any other styles you want)
      // Add more styles to remove as needed
    });
  }

  

dailysaledata:any;
gasSaleData:any;
gasPurchaseData:any;
lotteryData:any;
expenseData:any;
otherIncomeData:any;
creditCardData:any;
purchaseData:any;


fdailysaledata:any;
fgasSaleData:any;
fgasPurchaseData:any;
flotteryData:any;
fexpenseData:any;
fotherIncomeData:any;
fcreditCardData:any;
fpurchaseData:any;

graphData :any;

  ddailysale(pUserId: any, pStoreId: any) {

    this.http.getAll(environment.DashboardAdmin + "?pCompanyId=" + pUserId + "&pFromDate=" + "df" +"&pToDate="+ "asd" + "&pDate="+ "sd" + "&StoreId="+ pStoreId  ).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        console.log(result.data)

        this.dailysaledata = result.data.dailySaleData;
        this.gasSaleData = result.data.gasSaleData;
        this.gasPurchaseData = result.data.gasPurchaseData;
        this.lotteryData = result.data.lotteryData;
        this.expenseData = result.data.expenseData;
        this.otherIncomeData = result.data.otherIncomeData;
        this.creditCardData = result.data.creditCardData;
        this.purchaseData= result.data.purchaseData;

this.graphData = result.data;

     
this.fdailysaledata = [...this.dailysaledata].sort((a: { amountDate: string | number | Date; }, b: { amountDate: string | number | Date; }) => {
  const dateA = new Date(a.amountDate);
  const dateB = new Date(b.amountDate);
  return dateA.getTime() - dateB.getTime(); 
});
       
        this.fgasSaleData  = [...this.gasSaleData].sort((a: { amountDate: string | number | Date; }, b: { amountDate: string | number | Date; }) => {
          const dateA = new Date(a.amountDate);
          const dateB = new Date(b.amountDate);
          return dateA.getTime() - dateB.getTime(); 
        });
        this.fgasPurchaseData  = [...this.gasPurchaseData].sort((a: { amountDate: string | number | Date; }, b: { amountDate: string | number | Date; }) => {
          const dateA = new Date(a.amountDate);
          const dateB = new Date(b.amountDate);
          return dateA.getTime() - dateB.getTime(); 
        });
        this.flotteryData = [...this.lotteryData].sort((a: { amountDate: string | number | Date; }, b: { amountDate: string | number | Date; }) => {
          const dateA = new Date(a.amountDate);
          const dateB = new Date(b.amountDate);
          return dateA.getTime() - dateB.getTime(); 
        });
        this.fexpenseData  = [...this.expenseData].sort((a: { amountDate: string | number | Date; }, b: { amountDate: string | number | Date; }) => {
          const dateA = new Date(a.amountDate);
          const dateB = new Date(b.amountDate);
          return dateA.getTime() - dateB.getTime(); 
        });
        this.fotherIncomeData  = [...this.otherIncomeData].sort((a: { amountDate: string | number | Date; }, b: { amountDate: string | number | Date; }) => {
          const dateA = new Date(a.amountDate);
          const dateB = new Date(b.amountDate);
          return dateA.getTime() - dateB.getTime(); 
        });
        this.fcreditCardData  = [...this.creditCardData].sort((a: { amountDate: string | number | Date; }, b: { amountDate: string | number | Date; }) => {
          const dateA = new Date(a.amountDate);
          const dateB = new Date(b.amountDate);
          return dateA.getTime() - dateB.getTime(); 
        });
        this.fpurchaseData = [...this.purchaseData].sort((a: { amountDate: string | number | Date; }, b: { amountDate: string | number | Date; }) => {
          const dateA = new Date(a.amountDate);
          const dateB = new Date(b.amountDate);
          return dateA.getTime() - dateB.getTime(); 
        });

        this.gdailysaledata();
        this. ggasSaleData();
        this.ggasPurchaseData();
        this.glotteryData();
        this.gexpenseData();
        this.gotherIncomeData();
        this.gcreditCardData();
        this.gpurchaseData();

      }
      else {
        this.dailysaledata = null;

      }
    })
  }
  getPercentageChange(item:any): number {
    if(item!=null)
    {
      if (item!=null && item.length < 2) {
        return 0; // or handle this case as needed
      }
      return ((item[0].y - item[1].y) / item[0].y) * 100;

    }else
    {
      return 0;
    }
 
  }
  selectedValue:any= 0;

  ngOnInit() {
    this.selectedValue= 0;
    this.ddailysale(this.companyId, this.selectedValue);
    this.GetEmployeeStoreByUserId()

    
    setTimeout(() => {
      this.removeInlineStyle();
    }, 300); // Adjust the delay if necessary
  }
  onSelectChange(event: any) {
    this.ddailysale(this.companyId,event);

    //console.log('Selected value:', event); // Log the selected value
    // You can perform additional actions based on the selected value here
  }
  storedetail:any;

  GetEmployeeStoreByUserId() {

    this.http.getAll(environment.GetStoreByCompanyId +"?pComapnyId=" + this.companyId ).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        console.log(result.data)
        this.storedetail = result.data;
        
      }
      else { this.storedetail = null;
      }
    })
  }

  getdata()
  {
alert('d');    
  }


gdailysaledata()
{

  let chart = new CanvasJS.Chart('chartContainer', {
    theme: 'light1', // "light2", "dark1", "dark2"
    title: {
      text: 'Daily Sale',

    },
    data: [
      {
        type: 'column', // Change type to "bar", "area", "spline", "pie",etc.
        dataPoints:   this.fdailysaledata
       
      },
    ],
  });
  chart.render();
}
ggasSaleData()
  {
    let chart = new CanvasJS.Chart('chartContainer1', {
      theme: 'light1', // "light2", "dark1", "dark2"
      title: {
        text: 'Gas Sale',
      },
      data: [
        {
          type: 'column', // Change type to "bar", "area", "spline", "pie",etc.
          dataPoints: this.fgasSaleData, 
        },
      ],
    });
    chart.render();
   
  }


  glotteryData()
  {
    let chart = new CanvasJS.Chart('chartContainer2', {
      theme: 'light1', // "light2", "dark1", "dark2"
      title: {
        text: 'Lottery',
      },
      data: [
        {
          type: 'line', // Change type to "bar", "area", "spline", "pie",etc.
          dataPoints:this.flotteryData,
        },
      ],
    });
    chart.render();
   
  }

  gexpenseData()
  {
    let chart = new CanvasJS.Chart('chartContainer3', {
      theme: 'light1', // "light2", "dark1", "dark2"
      title: {
        text: 'Expense',
      },
      data: [
        {
          type: 'area', // Change type to "bar", "area", "spline", "pie",etc.
          dataPoints: this.fexpenseData}         ,
      ],
    });
    chart.render();
   
  }
  gotherIncomeData()
  {
    let chart = new CanvasJS.Chart('chartContainer4', {
      theme: 'light1', // "light2", "dark1", "dark2"
      title: {
        text: 'Other Income',
      },
      data: [
        {
          type: 'spline', // Change type to "bar", "area", "spline", "pie",etc.
          dataPoints: this.fotherIncomeData,
        },
      ],
    });
    chart.render();
   
  }
  ggasPurchaseData()
  {
    let chart = new CanvasJS.Chart('chartContainer7', {
      theme: 'light1', // "light2", "dark1", "dark2"
      title: {
        text: 'Gas Purchase',
      },
      data: [
        {
          type: 'stepLine', // Change type to "bar", "area", "spline", "pie",etc.
          dataPoints: this.fgasPurchaseData,
        },
      ],
    });
    chart.render();
 
  }

  gcreditCardData()
  {
    let chart = new CanvasJS.Chart('chartContainer5', {
      theme: 'light1', // "light2", "dark1", "dark2"
      title: {
        text: 'Credit Card Income',
      },
      data: [
        {
          type: 'stepArea', // Change type to "bar", "area", "spline", "pie",etc.
          dataPoints: this.fcreditCardData, 
        },
      ],
    });
    chart.render();
  
  }
  gpurchaseData()
  {
    let chart = new CanvasJS.Chart('chartContainer6', {
      theme: 'light1', // "light2", "dark1", "dark2"
      title: {
        text: 'Purchase',
      },
      data: [
        {
          type: 'stackedArea', // Change type to "bar", "area", "spline", "pie",etc.
          dataPoints: this.fpurchaseData
        },
      ],
    });
    chart.render();
  
  }
  pie9()
  {
    let chart = new CanvasJS.Chart('chartContainer9', {
      theme: 'light1', // "light2", "dark1", "dark2"
      title: {
        text: 'Daily Sale',
      },
      data: [
        {
          type: 'stackedBar', // Change type to "bar", "area", "spline", "pie",etc.
          dataPoints: [
            { label: '01-09-2024', y: 10 },
            { label: '02-09-2024', y: 15 },
            { label: '03-09-2024', y: 25 },
            { label: '04-09-2024', y: 30 },
            { label: '05-09-2024', y: 28 },
            { label: '06-09-2024', y: 10 },
            { label: '07-09-2024', y: 15 },
            { label: '08-09-2024', y: 25 },
            { label: '09-09-2024', y: 30 },
            { label: '10-09-2024', y: 28 },
            { label: '11-09-2024', y: 10 },
            { label: '12-09-2024', y: 15 },
            { label: '13-09-2024', y: 25 },
            { label: '14-09-2024', y: 30 },
            { label: '15-09-2024', y: 28 },
            { label: '16-09-2024', y: 10 },
            { label: '17-09-2024', y: 15 },
            { label: '18-09-2024', y: 25 },
            { label: '19-09-2024', y: 30 },
            { label: '20-09-2024', y: 28 },
            { label: '21-09-2024', y: 10 },
            { label: '22-09-2024', y: 15 },
            { label: '23-09-2024', y: 25 },
            { label: '24-09-2024', y: 30 },
            { label: '25-09-2024', y: 28 },
            { label: '26-09-2024', y: 10 },
            { label: '27-09-2024', y: 15 },
            { label: '28-09-2024', y: 25 },
            { label: '29-09-2024', y: 30 },
            { label: '30-09-2024', y: 28 },
          ],
        },
      ],
    });
    chart.render();
  
  }
}


  



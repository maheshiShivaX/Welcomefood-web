import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MonthService {

  constructor() { }

  getPaymentOptions(year: number): { label: string; fromdate: string; todate: string }[] {
    const months = [
      { label: 'January', days: 31 },
      { label: 'February', days: this.isLeapYear(year) ? 29 : 28 },
      { label: 'March', days: 31 },
      { label: 'April', days: 30 },
      { label: 'May', days: 31 },
      { label: 'June', days: 30 },
      { label: 'July', days: 31 },
      { label: 'August', days: 31 },
      { label: 'September', days: 30 },
      { label: 'October', days: 31 },
      { label: 'November', days: 30 },
      { label: 'December', days: 31 },
    ];

    return months.map((month, index) => ({
      label: month.label,
      fromdate: `${year}-${String(index + 1).padStart(2, '0')}-01`, // Change to 'yyyy-mm-dd' format
      todate: `${year}-${String(index + 1).padStart(2, '0')}-${month.days.toString().padStart(2, '0')}`, // Change to 'yyyy-mm-dd' format
   
    }));
  }

  private isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-dailysalesexpenses',
  templateUrl: './dailysalesexpenses.component.html',
  styleUrls: ['./dailysalesexpenses.component.scss']
})
export class DailysalesexpensesComponent {
  today: string;
  showCreditCardInput: boolean = true;
  showStoreInput: boolean = false;
  showLotteryInput: boolean = false;
  showArcadeInput: boolean = false;
  showOtherInput: boolean = false;
  showPayrollInput: boolean = false;
  showDailysaleInput: boolean = true;
  showGasInput: boolean = false;
  showPurchasesInput: boolean = false;
  showExpensesInput: boolean = false;
  activeButtonIndex: number | null = 0;

  constructor() {
    this.today = new Date().toISOString().split('T')[0];
  }

  videoslide: any = {
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    loop: false,
    autoplay: false,
    center: false,
    dots: false,
    autoHeight: false,
    autoWidth: false,
    navSpeed: 700,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      640: {
        items: 3
      },
      768: {
        items: 3
      },
      992: {
        items: 4
      },
      1200: {
        items: 5
      },
      1400: {
        items: 6
      }

    },
    nav: false,
    innerWidth: 200,
  }

  showtopData(pid: any) {
    // alert(pid)
    this.showDailysaleInput = false;
    this.showGasInput = false;
    this.showPurchasesInput = false;
    this.showExpensesInput = false;
    if (pid == 0) {
      this.showDailysaleInput = true;
    }
    else if (pid == 1) {
      this.showGasInput = true;
    }
    else if (pid == 2) {
      this.showPurchasesInput = true;
    }
    else {
      this.showExpensesInput = true;
    }
  }

  cashData: any[] = [/* Your cash data array */];
  activeIndex: number | null = 0;

  toggleActive(index: number): void {
    this.activeIndex = index === this.activeIndex ? null : index;
  }

  showData(pid: any) {
    // alert(pid)
    this.showCreditCardInput = false;
    this.showStoreInput = false;
    this.showLotteryInput = false;
    this.showArcadeInput = false;
    this.showOtherInput = false;
    this.showPayrollInput = false;
    if (pid == 0) {
      this.showCreditCardInput = true;
    }
    else if (pid == 1) {
      this.showStoreInput = true;
    }
    else if (pid == 2) {
      this.showLotteryInput = true;
    }
    else if (pid == 3) {
      this.showArcadeInput = true;
    }
    else if (pid == 4) {
      this.showOtherInput = true;
    }
    else {
      this.showPayrollInput = true;
    }
  }

}

import { Component } from '@angular/core';

@Component({
  selector: 'app-dailysales',
  templateUrl: './dailysales.component.html',
  styleUrls: ['./dailysales.component.scss']
})
export class DailysalesComponent {
  today: string;
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


  cashData: any[] = [/* Your cash data array */];
  activeIndex: number | null = 0;

  toggleActive(index: number): void {
    this.activeIndex = index === this.activeIndex ? null : index;
  }
  
}

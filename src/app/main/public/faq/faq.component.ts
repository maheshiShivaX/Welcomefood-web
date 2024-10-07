import { Component } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent {
  faqs = [
    {
      question: 'What is Lorem Ipsum?', answer: `Lorem Ipsum is simply dummy text of the printing and
    typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`,isOpen: false },

    {
      question: 'What is Lorem Ipsum?', answer: `Lorem Ipsum is simply dummy text of the printing and
    typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`,isOpen: false },

    {
      question: 'What is Lorem Ipsum?', answer: `Lorem Ipsum is simply dummy text of the printing and
    typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`,isOpen: false },

    {
      question: 'What is Lorem Ipsum?', answer: `Lorem Ipsum is simply dummy text of the printing and
    typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`,isOpen: false },

    {
      question: 'What is Lorem Ipsum?', answer: `Lorem Ipsum is simply dummy text of the printing and
    typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`,isOpen: false },
  ];

  openIndex: number | null = null;

  // toggleAccordion(index: number) {
  //   if (this.openIndex === index) {
  //     this.openIndex = null; 
  //   } else {
  //     this.openIndex = index;
  //   }
  // }

  toggleAccordion(index: number) {
    this.faqs[index].isOpen = !this.faqs[index].isOpen;

    for (let i = 0; i < this.faqs.length; i++) {
      if (i !== index) {
        this.faqs[i].isOpen = false;
      }
    }
  }
  
}

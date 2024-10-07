import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-mystore',
  templateUrl: './mystore.component.html',
  styleUrls: ['./mystore.component.scss']
})
export class MystoreComponent {
  ngOnInit() {


  }


  openPopup() {
    const popupContainer = document.getElementById('termpopupContainer');
    if (popupContainer) {
      popupContainer.style.display = 'block';
    }
  }

  closePopup() {
    const popupContainer = document.getElementById('termpopupContainer');
    if (popupContainer) {
      popupContainer.style.display = 'none';
    }
  }
}

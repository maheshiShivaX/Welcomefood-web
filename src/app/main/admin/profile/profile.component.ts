import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth.service';
import { HttpService } from 'src/app/_services/http.service';
import { environment } from 'src/app/environments/environment.prod';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  isLoading: boolean = false;
  submitted: boolean = false;
  companyId: any;
  loginId: any;
  companyProfile: any;
  constructor(private router: Router, private authService: AuthService,
    private http: HttpService, private toastr: ToastrService,
  ) {
    this.authService.currentUser.subscribe((user) => {
      const currentUser = user;
      this.loginId = currentUser.loginId;
      this.companyId = currentUser.companyId;
      // Update menu based on user authentication state
    });
  }
  ngOnInit() {

    this.GetStoreDetailbyCompanyId();
  }

  public form = new FormGroup({
    companyId: new FormControl(0),
    loginId: new FormControl(0),
    comapnyName: new FormControl(''),
    address: new FormControl(''),
    contactNo: new FormControl(''),
    emailid: new FormControl(''),
    isActive: new FormControl(true),
    createdBy: new FormControl(0),
  })

  public formOwner = new FormGroup({
    companyId: new FormControl(0),
    employeeId: new FormControl(0),
    name: new FormControl(''),
    address: new FormControl(''),
    mobileNo: new FormControl(''),
    emailid: new FormControl(''),
    gender: new FormControl(''),
    isHide: new FormControl(true),
    isActive: new FormControl(true),
    createdBy: new FormControl(0),
  })




  GetStoreDetailbyCompanyId() {
    this.http.getAll(environment.GetCompanyDetailById + "?pLoginId=" + this.loginId).subscribe((result: any) => {
      if (result.isSuccess == 1) {
 
        this.companyProfile = result.data;
      }
      else {
        // this.datalist = null;
      }
    })
  }

  onSubmit() {
    this.isLoading = true;
    this.submitted = true;


    if (this.form.invalid) {
      this.isLoading = false;
      return;
    }
    this.http.post(environment.SaveCompanyProfile, this.form.value).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        this.isLoading = false;
        this.submitted = false;
        this.onReset();
        this.GetStoreDetailbyCompanyId();
        this.toastr.success(result.message);
        this.closePopup();
      }
      else {
        this.isLoading = false;
        this.submitted = false;
      
        this.toastr.error(result.message);
      }
    });
  }

  onSubmitOwner() {
    this.isLoading = true;
    this.submitted = true;


    if (this.form.invalid) {
      this.isLoading = false;
      return;
    }
    this.http.post(environment.SaveEmployeeDetail, this.formOwner.value).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        this.isLoading = false;
        this.submitted = false;
        this.onReset();
        this.GetStoreDetailbyCompanyId();
        this.toastr.success(result.message);
        this.closePopupOwner();
      }
      else {
        this.isLoading = false;
        this.submitted = false;
      
        this.toastr.error(result.message);
      }
    });
  }

  onReset() {

  }

  openPopup(status: any) {
    if (status == 'Edit') {
      this.form.patchValue({
        comapnyName: this.companyProfile[0].comapnyName,
        companyId: this.companyProfile[0].companyId,
        contactNo: this.companyProfile[0].contactNo,
        emailid: this.companyProfile[0].emailid,
        address: this.companyProfile[0].address,
        loginId: this.companyProfile[0].loginId,
        isActive: this.companyProfile[0].isActive,
        createdBy: this.companyProfile[0].createdBy,
      });
    }
    const popupContainer = document.getElementById('productpopupContainer');
    if (popupContainer) {
      popupContainer.style.display = 'block';
    }
  }

  closePopup() {
    const popupContainer = document.getElementById('productpopupContainer');
    if (popupContainer) {
      popupContainer.style.display = 'none';
    }
  }


  openPopupOwner(status: any) {
    if (status == 'Edit') {
      this.formOwner.patchValue({
        // companyId:this.companyProfile[0].comapnyName,
        employeeId: this.companyProfile[0].employeeId,
        name: this.companyProfile[0].ownerName,
        emailid: this.companyProfile[0].ownerEmailId,
        address: this.companyProfile[0].address,
        mobileNo: this.companyProfile[0].ownerMobileNo,
        isActive: this.companyProfile[0].isActive,
        createdBy: this.companyProfile[0].createdBy,
      });
    }
    const popupContainer = document.getElementById('productpopupContainerOwner');
    if (popupContainer) {
      popupContainer.style.display = 'block';
    }
  }




  closePopupOwner() {
    const popupContainer = document.getElementById('productpopupContainerOwner');
    if (popupContainer) {
      popupContainer.style.display = 'none';
    }
  }



}

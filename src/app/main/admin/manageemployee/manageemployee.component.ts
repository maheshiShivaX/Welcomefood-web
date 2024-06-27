import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth.service';
import { HttpService } from 'src/app/_services/http.service';
import { environment } from 'src/app/environments/environment.prod';

interface TableRow {
  employeeId: number;
  name: string;
  storeCode: string;
  emailId: string;
  mobileNo: string;
  gender: string;
  loginStatus: string;
  visible: boolean;
}

@Component({
  selector: 'app-manageemployee',
  templateUrl: './manageemployee.component.html',
  styleUrls: ['./manageemployee.component.scss']
})
export class ManageemployeeComponent {

  isLoadingl: boolean = false;
  submittedl: boolean = false;
  companyId: any;

  isAsc: any = 'desc';
  pageSize: number = 50;
  currentPage: number = 1;
  isOpen = false;
  roles: any;

  employeedetails: any;
  employeedetail: any;
  datalist: TableRow[] = [];
  isLoading: boolean = false;
  submitted: boolean = false;
  public form = new FormGroup({
    employeeId: new FormControl(0),
    name: new FormControl('', Validators.required),
    emailId: new FormControl('', Validators.required),
    mobileNo: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    isHide: new FormControl(false),
    isActive: new FormControl(true),
    createdBy: new FormControl(0),
    comapnyId: new FormControl(0),
  });


  public formLogin = new FormGroup({
    loginId: new FormControl(0),
    employeeId: new FormControl(0, Validators.required),
    userId: new FormControl('', Validators.required),
    password: new FormControl(''),
    roleId: new FormControl(0, Validators.required),
    isApproved: new FormControl(false),
    isLocked: new FormControl(false),
    isActive: new FormControl(true),
    createdBy: new FormControl(0),
  });


  constructor(private router: Router, private authService: AuthService,
    private http: HttpService, private toastr: ToastrService,
  ) {
    this.authService.currentUser.subscribe((user) => {
      const currentUser = user;
      this.form.value.createdBy = currentUser.loginId;
      this.companyId = currentUser.companyId;
      // Update menu based on user authentication state
    });
  }

  // ================================================================

  filterValue: string = '';

  //  applyFilter() {
  //    const filter = this.filterValue.toUpperCase();
  //    this.datalist.forEach(row => {
  //      const txtValue = row.categoryName.toUpperCase();
  //      row.visible = txtValue.includes(filter);
  //    });
  //  }

  applyFilter() {
    const filter = this.filterValue.toUpperCase();
    this.datalist.forEach(row => {
      row.visible = false;
      for (const key in row) {
        if (row.hasOwnProperty(key)) {
          const value = row[key as keyof TableRow];
          if (typeof value === 'string' && value.toUpperCase().includes(filter)) {
            row.visible = true;
            break;
          }
        }
      }
    });
  }


  get totalPages(): number {
    return Math.ceil(this.datalist.length / this.pageSize);
  }

  // getPageNumbers(): (number | '...')[] {
  //   const pageNumbers: (number | '...')[] = [];
  //   const maxVisiblePages = 5;

  //   if (this.currentPage > maxVisiblePages / 2 + 1) {
  //     pageNumbers.push(1);
  //     pageNumbers.push('...');
  //   }

  //   for (let i = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2)); 
  //        i <= Math.min(this.totalPages, this.currentPage + Math.floor(maxVisiblePages / 2)); 
  //        i++) {
  //     pageNumbers.push(i);
  //   }

  //   if (this.currentPage < this.totalPages - maxVisiblePages / 2) {
  //     pageNumbers.push('...');
  //     pageNumbers.push(this.totalPages);
  //   }

  //   return pageNumbers;
  // }


  getPageNumbers(): (number | '...')[] {
    const pageNumbers: (number | '...')[] = [];
    const maxVisiblePages = 5;

    if (this.currentPage > Math.floor(maxVisiblePages / 2) + 1) {
      pageNumbers.push(1);
      pageNumbers.push('...');
    }

    let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);

    if (endPage === this.totalPages && endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (this.currentPage < this.totalPages - Math.floor(maxVisiblePages / 2)) {
      pageNumbers.push('...');
      pageNumbers.push(this.totalPages)
    }

    return pageNumbers;
  }

  get visibleRows(): TableRow[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.datalist.length);
    return this.datalist.slice(startIndex, endIndex);
  }

  onPageChange(pageNumber: number) {
    if (pageNumber !== null && pageNumber !== undefined) {
      this.currentPage = pageNumber;
    }
  }

  // onPageSizeChange(pageSize: any) {
  //   console.log(pageSize.target.value)

  //   pageSize = pageSize.target.value;
  //   if (pageSize !== null && pageSize !== undefined) {
  //     if (pageSize == 'all') {
  //       this.pageSize = this.datalist.length;
  //     }
  //     else {
  //       this.pageSize = pageSize;
  //     }

  //     this.currentPage = 1;
  //   }
  // }

  onPageSizeChange(pageSize: any) {
    const selectedPageSize = pageSize.target.value;
    if (selectedPageSize !== null && selectedPageSize !== undefined) {
      if (selectedPageSize === 'all') {
        this.pageSize = this.datalist.length;
      } else {
        this.pageSize = Number(selectedPageSize);
      }

      this.currentPage = 1;
    }
  }

  // =====sorting========
  onSortPageChanges(pageNumber: number, property: keyof TableRow, direction: 'asc' | 'desc') {
    if (direction == 'asc') {
      direction = 'desc';
      this.isAsc = 'desc'
    } else {
      direction = 'asc';
      this.isAsc = 'asc'
    }
    this.sortList(property, direction);
    this.currentPage = pageNumber;
  }

  // onSortPageSizeChanges(pageSize: any, property: keyof TableRow, direction: 'asc' | 'desc') {
  //   if (pageSize === 'all') {
  //     this.pageSize = this.datalist.length;
  //   } else {
  //     this.pageSize = pageSize;
  //   }

  //   this.sortList(property, direction);
  //   this.currentPage = 1;
  // }


  // Method to sort the list based on a property and direction
  sortList(property: keyof TableRow, direction: 'asc' | 'desc') {
    this.datalist.sort((a, b) => {
      const valueA = a[property];
      const valueB = b[property];

      if (valueA < valueB) {
        return direction === 'asc' ? -1 : 1;
      } else if (valueA > valueB) {
        return direction === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
  }


  // =============================================================================

  openDrawer() {
    this.isOpen = true;
  }

  closeDrawer() {
    this.isOpen = false;
  }

  ngOnInit() {

    this.GetEmployeeDetailbyCompanyId();
  }

  onSubmit() {

    this.isLoading = true;
    this.submitted = true;

    console.log(this.form.value);
    if (this.form.invalid) {
      this.isLoading = false;
      return;
    }
    this.form.value.comapnyId = this.companyId;

    this.http.post(environment.SaveEmployeeDetail, this.form.value).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        this.closeDrawer();
        this.isLoading = false;
        this.submitted = false;
        this.onReset();
        this.GetEmployeeDetailbyCompanyId();
        this.toastr.success(result.message);
        this.closeDrawer();
      }
      else {
        this.isLoading = false;
        this.submitted = false;
        console.log(result);
        this.toastr.error(result.message);
      }
    });
  }

  get f() {
    return this.form.controls;
  }

  GetEmployeeDetailbyCompanyId() {
    this.http.getAll(environment.GetEmployeeDetailbyCompanyId+"?pCompanyId="+this.companyId).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        console.log(result.data)
        this.datalist = result.data;
        this.datalist = this.datalist.map(item => {
          return { ...item, visible: true };
        });
        console.log(this.datalist)
      }
      else {
        this.employeedetails = null;
      }
    })
  }
  GetRole() {
    this.http.getAll(environment.GetForAdminRole).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        console.log(result.data)
        this.roles = result.data;
      }
      else {
        this.employeedetails = null;
      }
    })
  }


  onReset() {
    this.form.patchValue({
      employeeId: 0,
      name: '',
      emailId: '',
      mobileNo: '',
      gender: '',
      isHide: false,
      isActive: true,
      createdBy: 0

    });
  }




  onEdit(pId: any) {
    this.openDrawer()
    this.employeedetail = this.datalist.filter(((x: { employeeId: any; }) => x.employeeId == pId));

    this.form.patchValue({
      employeeId: this.employeedetail[0].employeeId,
      name: this.employeedetail[0].name,
      emailId: this.employeedetail[0].emailId,
      mobileNo: this.employeedetail[0].mobileNo,
      gender: this.employeedetail[0].gender,
      isHide: this.employeedetail[0].isHide,

      isActive: this.employeedetail[0].isActive,
      createdBy: this.employeedetail[0].createdBy,

    });
  }

  // onUser(item:any)
  // {
  //   this.GetRole();
  //   this.formLogin.patchValue({
  //     employeeId: item.employeeId,
  //     userId: item.emailId,
  //   });
  // }

  openPopup(item: any) {
    const popupContainer = document.getElementById('termpopupContainer');
    if (popupContainer) {
      popupContainer.style.display = 'block';
    }
    this.GetRole();
    this.formLogin.patchValue({
      employeeId: item.employeeId,
      userId: item.emailId,
    });
  }

  useropenPopup(item: any) {
    const popupContainer = document.getElementById('userpopupContainer');
    if (popupContainer) {
      popupContainer.style.display = 'block';
    }
    this.GetRole();
    this.formLogin.patchValue({
      employeeId: item.employeeId,
      userId: item.emailId,
    });
  }





  closePopup() {
    const popupContainer = document.getElementById('userpopupContainer');
    if (popupContainer) {
      popupContainer.style.display = 'none';
    }
  }


  onDelete(pId: any) {

    this.http.getAll(environment.DeleteEmployeeDetailById + "?pEmployeeDetailId=" + pId).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        console.log(result.data)
        this.toastr.error(result.message);

        this.GetEmployeeDetailbyCompanyId()
      }
      else {
      }
    })
  }



  onLoginSubmit() {

    this.isLoadingl = true;
    this.submittedl = true;

    console.log(this.formLogin.value);
    if (this.formLogin.invalid) {
      this.isLoadingl = false;
      return;
    }


    this.http.post(environment.SaveLoginDetail, this.formLogin.value).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        this.closeDrawer();
        this.isLoadingl = false;
        this.submittedl = false;
        this.onReset();
        this.GetEmployeeDetailbyCompanyId();
        this.toastr.success(result.message);
        this.closePopup();
      }
      else {
        this.isLoadingl = false;
        this.submittedl = false;
        console.log(result);
        this.toastr.error(result.message);
      }
    });
  }
}

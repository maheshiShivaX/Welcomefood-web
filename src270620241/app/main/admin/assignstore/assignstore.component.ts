import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth.service';
import { HttpService } from 'src/app/_services/http.service';
import { environment } from 'src/app/environments/environment.prod';

interface TableRow {
  employeeStoreId: number;
  employeeName: string;
  storeName: string;
  isActive:boolean;
  visible: boolean;
}

@Component({
  selector: 'app-assignstore',
  templateUrl: './assignstore.component.html',
  styleUrls: ['./assignstore.component.scss']
})
export class AssignstoreComponent {

  storedetail: any;
  employeedetails: any;
  employeeStores:any;
  datalist: TableRow[] = [];
  isAsc: any = 'desc';
  pageSize: number = 50;
  currentPage: number = 1;
  isLoading: boolean = false;
  submitted: boolean = false;
  companyId:any;
  constructor(private router: Router, private authService: AuthService,
    private http: HttpService, private toastr: ToastrService,
  ) {
    this.authService.currentUser.subscribe((user) => {
      const currentUser = user;
      this.companyId = currentUser.companyId;

      // Update menu based on user authentication state
    });
  }

  public form = new FormGroup({
    employeeStoreId: new FormControl(0),
    employeeId: new FormControl(0),
    storeId: new FormControl(0),
    isActive: new FormControl(true),
    createdBy: new FormControl(0),
    loginId:new FormControl(0),
  });


  ngOnInit() {
    this.GetEmployeeDetail();
    this.GetStoreDetailAll();
    this.  GetEmployeeStore();
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


  GetStoreDetailAll() {
    this.http.getAll(environment.GetStoreDetailbyCompanyId  + "?pCompanyId="+this.companyId ).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        console.log(result.data)
        this.storedetail = result.data;
      }
      else {
        this.storedetail = null;
      }
    })
  }
  GetEmployeeDetail() {
    this.http.getAll(environment.GetLoginDetailByCompanyRole+ "?pRoleId=" + 3  + "&pComapnyId="+this.companyId).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        console.log(result.data)
        this.employeedetails = result.data;
      }
      else {
        this.employeedetails = null;
      }
    })
  }
  GetEmployeeStore() {
    this.http.getAll(environment.GetEmployeeStoreByCompanyId + "?pCompanyId="+this.companyId).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        console.log(result.data)
        this.datalist = result.data;
        this.datalist = this.datalist.map(item => {
          return { ...item, visible: true };
        });
      }
      else {
        this.employeeStores = null;
      }
    })
  }



  onActive(pId:any)
  {
      this.http.getAll(environment.ActiveEmployeeStoreById+ "?pEmployeeStoreId=" + pId ).subscribe((result: any) => {
        if (result.isSuccess == 1) {
          console.log(result.data)
          this.toastr.success(result.message);
        
          this.GetEmployeeStore();
        }
        else {
        }
      })
    }

  onDelete(pId:any)
  {
      this.http.getAll(environment.DeleteEmployeeStoreById+ "?pEmployeeStoreId=" + pId ).subscribe((result: any) => {
        if (result.isSuccess == 1) {
          console.log(result.data)
          this.toastr.success(result.message);
        
          this.GetEmployeeStore();
        }
        else {
        }
      })
    }

  

  onSubmit() {

    this.isLoading = true;
    this.submitted = true;

    console.log(this.form.value);
    if (this.form.invalid) {
      this.isLoading = false;
      return;
    }

    this.form.value.loginId = this.employeedetails.filter((x: { employeeId: number | null | undefined; })=>x.employeeId== this.form.value.employeeId)[0].loginId

    this.http.post(environment.SaveEmployeeStore, this.form.value).subscribe((result: any) => {
      if (result.isSuccess == 1) {

        this.isLoading = false;
        this.submitted = false;
        this.onReset();
        this.GetEmployeeStore();
        this.toastr.success(result.message);
      }
      else {
        this.isLoading = false;
        this.submitted = false;
        console.log(result);
        this.toastr.error(result.message);
      }
    });
  }
  onReset()
  {
    this.form.patchValue({
      employeeId: 0,
      storeId: 0,
      employeeStoreId: 0,
   
      isActive: true,
      createdBy: 0

    });
  }
}

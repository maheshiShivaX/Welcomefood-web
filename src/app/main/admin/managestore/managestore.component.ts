import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth.service';
import { HttpService } from 'src/app/_services/http.service';
import { environment } from 'src/app/environments/environment.prod';

interface TableRow {
  storeId: number;
  storeName: string;
  storeCode: string;
  storeMailId: string;
  storeContactNo: string;
  storeOpeningDate: string;
  address: string;
  visible: boolean;
}

@Component({
  selector: 'app-managestore',
  templateUrl: './managestore.component.html',
  styleUrls: ['./managestore.component.scss']
})
export class ManagestoreComponent {
  storedetails: any;
  storedetail: any;
  datalist: TableRow[] = [];
  isLoading: boolean = false;
  submitted: boolean = false;
  isAsc: any = 'desc';
  pageSize: number = 50;
  currentPage: number = 1;
  public form = new FormGroup({
    storeId: new FormControl(0),
    storeCode: new FormControl('', Validators.required),
    storeName: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    storeOpeningDate: new FormControl('', Validators.required),
    storeContactNo: new FormControl('', Validators.required),
    storeMailId: new FormControl('',  Validators.email),
    contactPerson: new FormControl(''),
    isActive: new FormControl(true),
    createdBy: new FormControl(0),
    comapnyId:new FormControl(0),
  });

  constructor(private router: Router, private authService: AuthService,
    private http: HttpService, private toastr: ToastrService,
  ) {
    this.authService.currentUser.subscribe((user) => {
      const currentUser = user;
      this.form.value.createdBy = currentUser.loginId;
      this.companyId= currentUser.companyId;
      // Update menu based on user authentication state
    });
  }


// ================================================================

filterValue: string = '';
companyId:any;
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


  ngOnInit() {

    this.GetStoreDetailbyCompanyId();
  }

  onSubmit() {
    this.isLoading = true;
    this.submitted = true;
    if (this.form.invalid) {
      this.isLoading = false;
      return;
    }

    this.form.value.comapnyId = this.companyId;
   
    console.log(this.form.value);
    //return;
    this.http.post(environment.SaveStoreDetail, this.form.value).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        this.isLoading = false;
        this.submitted = false;
        this.onReset();
        this.GetStoreDetailbyCompanyId();
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

  get f() {
    return this.form.controls;
  }

  GetStoreDetailbyCompanyId() {
    this.http.getAll(environment.GetStoreDetailbyCompanyId+"?pCompanyId="+this.companyId).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        console.log(result.data)
        this.datalist = result.data;
        this.datalist = this.datalist.map(item => {
          return { ...item, visible: true };
        });
        console.log(this.datalist)
      }
      else { 
        // this.datalist = null;
      }
    })
  }

  onProduct(storeId:any)
  {

    this.router.navigateByUrl('admin/managestoreproduct/' + storeId);
  }


  onReset() {
    this.submitted = false;
    this.form.patchValue({
      storeId: 0,
      storeCode: '',
      storeName: '',
      address: '',
      storeOpeningDate: '',
      storeContactNo: '',
      storeMailId: '',
      contactPerson: '',
      isActive: true,
      createdBy: 0

    });
  }

  onEdit(pId:any)
  {
   
    this.storedetails = this.datalist.filter(((x: { storeId: any; }) => x.storeId == pId));

    this.form.patchValue({
      storeId: this.storedetails[0].storeId,
      storeCode:  this.storedetails[0].storeCode,
      storeName:  this.storedetails[0].storeName,
      address:  this.storedetails[0].address,
      storeOpeningDate:  this.storedetails[0].entryDate,
      storeContactNo:  this.storedetails[0].storeContactNo,
      storeMailId:  this.storedetails[0].storeMailId,
      contactPerson:  this.storedetails[0].contactPerson,
      isActive: this.storedetails[0].isActive,
      createdBy: this.storedetails[0].createdBy,

     // date.toISOString().split('T')[0];
      
    });
  }
  onDelete(pId:any)
  {

      this.http.getAll(environment.DeleteStoreDetailById+ "?pStoreDetailId=" + pId ).subscribe((result: any) => {
        if (result.isSuccess == 1) {
          console.log(result.data)
          this.toastr.error(result.message);
        
          this.GetStoreDetailbyCompanyId()
        }
        else {
        }
      })
    }

    onOnboardStore(pid:any)
    {
      this.router.navigateByUrl('/admin/onboardstore/'+ pid);
    }
  
   
}

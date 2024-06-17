import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth.service';
import { HttpService } from 'src/app/_services/http.service';
import { environment } from 'src/app/environments/environment.prod';

interface TableRow {
  storeProductId: number;
  storeName: string;
  productCategoryName: string;
  productName: string;
  isActive:boolean;
  visible: boolean;
}

@Component({
  selector: 'app-managestoreproduct',
  templateUrl: './managestoreproduct.component.html',
  styleUrls: ['./managestoreproduct.component.scss']
})
export class ManagestoreproductComponent {
  products: any;
  storedetail: any;
  productcategory: any;
  productstores: any;
  datalist: TableRow[] = [];
  isLoading: boolean = false;
  submitted: boolean = false;
  isAsc: any = 'desc';
  pageSize: number = 50;
  currentPage: number = 1;
  constructor(private router: Router, private authService: AuthService,
    private http: HttpService, private toastr: ToastrService,
  ) {
    this.authService.currentUser.subscribe((user) => {
      const currentUser = user;

      // Update menu based on user authentication state
    });
  }

  public form = new FormGroup({
    storeProductId: new FormControl(0),
    productCategoryId: new FormControl(0),
    productId: new FormControl(0),
    storeId: new FormControl(0),
    isActive: new FormControl(true),
    createdBy: new FormControl(0),
  });

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



  ngOnInit() {
    this.GetStoreDetailAll();
    this.GetStoreProduct();
    this.GetProductCategory();
  }


  GetProductCategory() {
    this.http.getAll(environment.GetProductCategory).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        console.log(result.data)
        this.productcategory = result.data;
      }
      else {
        this.productcategory = null;
      }
    })
  }
  GetProductDetailbyCategoryId(pCategoryId: any) {
    this.http.getAll(environment.GetProductDetailbyCategoryId + "?pCategoryId=" + pCategoryId).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        console.log(result.data)
        this.products = result.data;
      }
      else {
        this.products = null;
      }
    })
  }


  GetStoreDetailAll() {
    this.http.getAll(environment.GetStoreDetail).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        console.log(result.data)
        this.storedetail = result.data;
      }
      else {
        this.storedetail = null;
      }
    })
  }

  GetStoreProduct() {
    this.http.getAll(environment.GetStoreProduct).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        console.log(result.data)
        this.datalist = result.data;
        this.datalist = this.datalist.map(item => {
          return { ...item, visible: true };
        });
      }
      else {
        this.productstores = null;
      }
    })
  }



  onActive(pId: any) {
    this.http.getAll(environment.ActiveStoreProductById + "?pStoreProductId=" + pId).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        console.log(result.data)
        this.toastr.success(result.message);

        this.GetStoreProduct();
      }
      else {
      }
    })
  }

  onDelete(pId: any) {
    this.http.getAll(environment.DeleteStoreProductById + "?pStoreProductId=" + pId).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        console.log(result.data)
        this.toastr.success(result.message);

        this.GetStoreProduct();
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


    this.http.post(environment.SaveStoreProduct, this.form.value).subscribe((result: any) => {
      if (result.isSuccess == 1) {

        this.isLoading = false;
        this.submitted = false;
        this.onReset();
        this.GetStoreProduct();
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
  onReset() {
    this.form.patchValue({
      storeProductId: 0,
      storeId: 0,
      productCategoryId: 0,
      productId: 0,
      isActive: true,
      createdBy: 0

    });
  }
}


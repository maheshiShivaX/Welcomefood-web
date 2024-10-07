import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth.service';
import { HttpService } from 'src/app/_services/http.service';
import { environment } from 'src/app/environments/environment.prod';

interface TableRow {
  storeProductId: number;
  storeName: string;
  productCategoryName: string;
  productName: string;
  isActive: boolean;
  visible: boolean;
}


interface ProductItem {
  categoryName: string;
  createdDate: number;
  productCode: string;
  productName: string;
  productId: number
  productCategoryId: number
  isActive: boolean;
  createdBy: number;
}


@Component({
  selector: 'app-managestoreproduct',
  templateUrl: './managestoreproduct.component.html',
  styleUrls: ['./managestoreproduct.component.scss']
})
export class ManagestoreproductComponent {
  isAdd: any;
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
  constructor(private router: Router, private authService: AuthService, private route: ActivatedRoute,
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
    productId: new FormControl('',Validators.required),
    storeId: new FormControl(0),
    isActive: new FormControl(true),
    createdBy: new FormControl(0),
  });

  // ================================================================

  filterValue: string = '';

  onProductCategory(pid: any) {

  }

  onAdd() {
    if (this.isAdd == true) {
      this.isAdd = false;
    } else {
      this.isAdd = true;
    }

  }
  get f() {
    return this.form.controls;
  }

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
  storeId: any;


  ngOnInit() {
    this.storeId =  this.route.snapshot.params["storeId"];

    this.GetStoreDetailAll(this.storeId);
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
        this.checkal = false;
        this.form.patchValue({
          productCategoryId : pCategoryId,

        })
      }
      else {
        this.products = null;
      }
    })
  }

  checkal: boolean = false
  checkalproduct: boolean = false;
  rownew: any;
  selectedItems: ProductItem[] = [];

  isSelecteds(): boolean {


    if (this.checkal == false) {
      this.checkal = true;
    } else {
      this.checkal = false;
    }

    return this.checkal;
  }

  isSelected(row: any): boolean {

    //   console.log(row);
    return this.selectedItems.includes(row);
  }

  oncheckAllSubCategory(itemList: any) {

    console.log(itemList);

    try {

      debugger;
      this.isSelecteds();
      itemList.forEach((element: any[]) => {
        this.rownew = element;
        console.log(this.rownew);
        if (this.checkal == false) {
          this.selectedItems = [];
        } else {
          this.selectedItems.push(this.rownew);
        }

      });
      console.log(this.selectedItems);
      if (this.selectedItems.length > 0) {
        console.log(this.selectedItems.length);
        const subCategoryIds: number[] = this.selectedItems.map(item => item.productId);
        const commaSeparatedString: string = subCategoryIds.join(',');
        console.log(commaSeparatedString);

        this.form.patchValue(
          {
            productId : commaSeparatedString,

          }
        )
     
      }
    }
    catch (error) {
      // Handle the error
      console.error('An error occurred:', error);
    }

  }

  GetStoreDetailAll(storeId: any) {
    this.http.getAll(environment.GetStoreDetail).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        console.log(result.data)
        this.storedetail = result.data.filter((x: { storeId: any; }) => x.storeId == storeId);
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
        this.datalist = result.data.filter((x: { storeId: any; }) => x.storeId == this.storeId);
        this.datalist = this.datalist.map(item => {
          return { ...item, visible: true };
        });
      }
      else {
        this.datalist = [];
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
    //this.form.value.productId = commaSeparatedString
    console.log(this.form.value);
    this.form.value.storeId = this.storeId;
  
    if (this.form.invalid) {
      this.isLoading = false;
      return;
    }
    //this.form

    this.http.post(environment.SaveStoreProductBulk, this.form.value).subscribe((result: any) => {
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
     this.selectedItems=[];
    this.checkal =false;
    this.form.patchValue({
      storeProductId: 0,
      storeId: 0,
      productCategoryId: 0,
      productId: '',
      isActive: true,
      createdBy: 0

    });

  
  }
}


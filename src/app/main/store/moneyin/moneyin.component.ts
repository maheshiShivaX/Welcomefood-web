import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth.service';
import { HttpService } from 'src/app/_services/http.service';
import { environment } from 'src/app/environments/environment.prod';

interface TableRow {
  productCategoryId: number;
  propductCategory: string;
  propductName: string;
  amount: string;
  visible: boolean;
}

@Component({
  selector: 'app-moneyin',
  templateUrl: './moneyin.component.html',
  styleUrls: ['./moneyin.component.scss']
})
export class MoneyinComponent {

  public form = new FormGroup({
    itemSaleId: new FormControl(0),
    productCategoryId: new FormControl(0, Validators.required),
    productId: new FormControl(0, Validators.required),
    payMode: new FormControl(1, Validators.required),
    amount: new FormControl(0, Validators.required),
    amountDate: new FormControl('2024-05-08', Validators.required),
    isActive: new FormControl(true),
    createdBy: new FormControl(0),
    storeId: new FormControl(1),

  });
  storename: any;
  previousdayAmount: any;
  previousAmount: any;
  entryDate: string | undefined;
  datalist: TableRow[] = [];
  isAsc: any = 'desc';
  pageSize: number = 50;
  currentPage: number = 1;
  storeid: any
  isLoading: boolean = false;
  submitted: boolean = false;
  productlist: any;
  saleList: any;
  productcategorylist: any;
  productgrouplist: any;
  loginId: any;
  asdate: Date | undefined
  constructor(private router: Router, private authService: AuthService, private route: ActivatedRoute,
    private http: HttpService, private toastr: ToastrService,
  ) {
    this.authService.currentUser.subscribe((user) => {

      console.log(user);
      const currentUser = user;
      this.loginId = currentUser.loginId;
      // Update menu based on user authentication state
    });

    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = ('0' + (today.getMonth() + 1)).slice(-2); // Add leading zero, month starts at 0
    const dd = ('0' + today.getDate()).slice(-2); // Add leading zero
    this.entryDate = `${yyyy}-${mm}-${dd}`;
    this.previousDateFromSelected = this.calculatePreviousDate(today);

  }

  previousDateFromSelected: any;


  formatDate(date: Date): string {
    const yyyy = date.getFullYear();
    const mm = ('0' + (date.getMonth() + 1)).slice(-2);
    const dd = ('0' + date.getDate()).slice(-2);
    return `${yyyy}-${mm}-${dd}`;
  }
  calculatePreviousDate(date: Date): string {

    date.setDate(date.getDate() - 1);
    return this.formatDate(date);
  }

  onDateChange(newDate: any) {
    let dateString = newDate.target.value;
    let dateObject = new Date(dateString);
    this.previousDateFromSelected = this.calculatePreviousDate(dateObject);
    console.log("Date changed to:", newDate.target.value);
    this.GetProductGroup(this.storeid, newDate.target.value);
    this.GetTotalCashinhandByDate(this.storeid, this.previousDateFromSelected);
    // You can add more logic here to handle the change
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
  ngOnInit() {

    this.storeid = this.route.snapshot.params["storeId"];
    this.GetProductGroup(this.storeid, this.entryDate);
    this.GetTotalCashinhandByDate(this.storeid, this.previousDateFromSelected)
  }



  GetTotalCashinhandByDate(pStoreId: any, pAmountDate: any) {

    this.http.getAll(environment.GetTotalCashinhandByDate + "?pStoreId=" + pStoreId + "&pAmountDate=" + pAmountDate).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        console.log(result.data)
        this.previousAmount = result.data;
        this.previousdayAmount = this.previousAmount[0].amount

      }
      else {
        this.previousAmount = null;
        this.previousdayAmount = 0;
      }
    })
  }


  GetProductGroup(pStoreId: any, pAmountDate: any) {

    this.http.getAll(environment.GetStoreProductByStoreId + "?pStoreId=" + pStoreId + "&pAmountDate=" + pAmountDate).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        console.log(result.data)
        this.productgrouplist = result.data;
        this.storename = this.productgrouplist[0].storeName;
        this.GetProductCategoryByGroupId(this.storeid, this.productgrouplist[0].groupId);
        0
      }
      else {
        this.productgrouplist = null;
      }
    })
  }
  GetItemSalebyCategoryid(pProductGroupId: any, pStoreId: any, pAmountDate: any) {

    this.http.getAll(environment.GetItemSalebyCategoryid + "?pProductGroupId=" + pProductGroupId + "&pStoreId=" + pStoreId + "&pAmountDate=" + pAmountDate).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        console.log(result.data)
        this.datalist = result.data;
        this.datalist = this.datalist.map(item => {
          return { ...item, visible: true };
        });
        console.log(this.datalist)
      }
      else {
        this.datalist = [];
      }
    })
  }

  GetProductCategoryByGroupId(pStoreId: any, pGroupId: any) {

    this.http.getAll(environment.GetProductCategoryByStoreGroupId + "?pStoreId=" + pStoreId + "&pGroupId=" + pGroupId).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        console.log(result.data)
        this.productcategorylist = result.data;

        this.GetItemSalebyCategoryid(pGroupId, this.storeid, this.entryDate)
        this.groupId = pGroupId;

      }
      else {
        this.productcategorylist = null;
      }
    })
  }

  onGroup(pid: any, i:any) {
    console.log(pid);
    this.GetProductCategoryByGroupId(this.storeid, pid);
    this.toggleActive(i);
  }

  GetProductDetailbyCategoryId(pCategoryId: any) {


    this.http.getAll(environment.GetProductbyStoreId + "?pStoreId=" + this.storeid + "&pCategoryId=" + pCategoryId).subscribe((result: any) => {
      if (result.isSuccess == 1) {
        console.log(result.data)
        this.productlist = result.data;
      }
      else {
        this.productlist = null;
      }
    })
  }





  groupId: any;
  onSubmit() {

    this.isLoading = true;
    this.submitted = true;

    this.form.patchValue({

      storeId: this.storeid,
      amountDate: this.entryDate,
      payMode: 1,
    })

    if (this.form.value.amount == 0) {
      this.isLoading = false;
      this.toastr.error('Please enter valid amount')
      return;
    }

    console.log(this.form.value);
    if (this.form.invalid) {
      this.isLoading = false;
      return;
    }

    this.http.post(environment.SaveItemSale, this.form.value).subscribe((result: any) => {
      if (result.isSuccess == 1) {

        this.isLoading = false;
        this.submitted = false;
        this.onReset();
        // this.GetStoreProduct();
        this.toastr.success(result.message);
        this.GetProductGroup(this.storeid, this.entryDate);
        this.GetItemSalebyCategoryid(this.groupId, this.storeid, this.entryDate)
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

      storeId: 0,
      amountDate: '',
      payMode: 0,
      productCategoryId: 0,
      productId: 0,
      amount: 0,
      isActive: true,
      createdBy: 0,


    })
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
  activeIndex: number | null = null;

  toggleActive(index: number): void {
    this.activeIndex = index === this.activeIndex ? null : index;
  }
}


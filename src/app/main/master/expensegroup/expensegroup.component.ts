import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth.service';
import { HttpService } from 'src/app/_services/http.service';
import { environment } from 'src/app/environments/environment.prod';

interface TableRow {
  companyId: number;
  expenseGroupId:number;
  expenseGroupName: string;
  visible: boolean;
}

@Component({
  selector: 'app-expensegroup',
  templateUrl: './expensegroup.component.html',
  styleUrls: ['./expensegroup.component.scss']
})
export class ExpensegroupComponent {
companyId:any;
  expenseheads:any;
  expensehead:any;
   datalist: TableRow[] = [];
   isLoading: boolean = false;
   submitted: boolean = false;
   isAsc: any = 'desc';
   pageSize: number = 50;
   currentPage: number = 1;
   public form = new FormGroup({
    companyId: new FormControl(0),
    expenseGroupId:new FormControl(0),
    expenseGroupName: new FormControl('', Validators.required),
     isActive: new FormControl(true),
     createdBy: new FormControl(0),
   });
 
   
 
  
 
   constructor(private router: Router, private authService: AuthService,
     private http: HttpService, private toastr: ToastrService,
   ) {
     this.authService.currentUser.subscribe((user) => {
       const currentUser = user;
       this.form.value.createdBy = currentUser.loginId;
 this.companyId=currentUser.companyId;
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
 
   openPopup(status:any) {
     if(status=='New')
       {
         this.onReset();
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
 
   ngOnInit() {
 
     this.GetExpenseGroupByCompanyId(this.companyId);
   }
 
   onSubmit() {
     this.isLoading = true;
     this.submitted = true;

     this.form.patchValue({
      companyId:this.companyId
     })
     if (this.form.invalid) {
       this.isLoading = false;
       return;
     }
 
    
     this.http.post(environment.SaveExpenseGroup, this.form.value).subscribe((result: any) => {
       if (result.isSuccess == 1) {
         this.isLoading = false;
         this.submitted = false;
         this.onReset();
         this.GetExpenseGroupByCompanyId(this.companyId);
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
 
   GetExpenseGroupByCompanyId(companyid:any) {
     this.http.getAll(environment.GetExpenseGroupByCompanyId+"?pCompanyId="+companyid).subscribe((result: any) => {
       if (result.isSuccess == 1) {
         console.log(result.data)
         this.datalist = result.data;
         this.datalist = this.datalist.map(item => {
           return { ...item, visible: true };
         });
         console.log(this.datalist)
       }
       else { 
         // this.products = null;
       }
     })
   }
 
 
   onReset() {
     this.form.patchValue({
       companyId: 0,
       expenseGroupId: 0,
       expenseGroupName: '',
       isActive: true,
       createdBy: 0
 
     });
   }
 
  
 
 
  
   onEdit(pId:any)
   {
     this.expensehead = this.datalist.filter(((x: { expenseGroupId: any; }) => x.expenseGroupId == pId));
     this.form.patchValue({
      expenseGroupId: this.expensehead[0].expenseGroupId,
      expenseGroupName:  this.expensehead[0].expenseGroupName,
      companyId:  this.expensehead[0].companyId,
       isActive: this.expensehead[0].isActive,
       createdBy: this.expensehead[0].createdBy,
     });
     this.openPopup('');
   }
 
 
 
 
   onDelete(pId:any)
   {
 
       this.http.getAll(environment.DeleteExpenseGroupById+ "?pExpenseGroupId=" + pId ).subscribe((result: any) => {
         if (result.isSuccess == 1) {
           console.log(result.data)
           this.toastr.error(result.message);
         
           this.GetExpenseGroupByCompanyId(this.companyId);
         }
         else {
         }
       })
     }
     
   
   
 }
 
 
 
 

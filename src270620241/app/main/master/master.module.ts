import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductcategoryComponent } from './productcategory/productcategory.component';
import { ProductdetailComponent } from './productdetail/productdetail.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ExpenseheadComponent } from './expensehead/expensehead.component';

const routes: Routes = [
  { path: 'productcategory', component: ProductcategoryComponent },
  {
    path: 'productdetail', component: ProductdetailComponent
  },
  {
    path: 'expensehead', component: ExpenseheadComponent
  }


  
]

@NgModule({
  declarations: [
    ProductcategoryComponent,
    ProductdetailComponent,
    ExpenseheadComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
  ]
})
export class MasterModule { }

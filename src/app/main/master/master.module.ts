import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductcategoryComponent } from './productcategory/productcategory.component';
import { ProductdetailComponent } from './productdetail/productdetail.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ExpenseheadComponent } from './expensehead/expensehead.component';
import { ExpensegroupComponent } from './expensegroup/expensegroup.component';
import { IncometypeComponent } from './incometype/incometype.component';
import { CreditcardComponent } from './creditcard/creditcard.component';

const routes: Routes = [
  { path: 'productcategory', component: ProductcategoryComponent },
  {
    path: 'productdetail', component: ProductdetailComponent
  },
  {
    path: 'expensehead', component: ExpenseheadComponent
  },
  {
    path: 'expensegroup', component: ExpensegroupComponent
  },
  {
    path: 'incometype', component: IncometypeComponent
  }
  ,
  {
    path: 'creditcard', component: CreditcardComponent
  }

  

]

@NgModule({
  declarations: [
    ProductcategoryComponent,
    ProductdetailComponent,
    ExpenseheadComponent,
    ExpensegroupComponent,
    IncometypeComponent,
    CreditcardComponent
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

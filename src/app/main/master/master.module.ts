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
import { ManagelotteryComponent } from './managelottery/managelottery.component';
import { ManagebstermComponent } from './managebsterm/managebsterm.component';
import { TestpageComponent } from './testpage/testpage.component';
import { TaxtypeComponent } from './taxtype/taxtype.component';
import { ReconsiletypeComponent } from './reconsiletype/reconsiletype.component';

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
  ,
  {
    path: 'lottery', component: ManagelotteryComponent
  }
  
  ,
  {
    path: 'managebsterm', component: ManagebstermComponent
  }
  ,
  {
    path: 'testpage', component: TestpageComponent
  },
  {
    path: 'taxtype', component: TaxtypeComponent
  }
  ,
  {
    path: 'reconsiletype', component: ReconsiletypeComponent
  }


]

@NgModule({
  declarations: [
    ProductcategoryComponent,
    ProductdetailComponent,
    ExpenseheadComponent,
    ExpensegroupComponent,
    IncometypeComponent,
    CreditcardComponent,
    ManagelotteryComponent,
    ManagebstermComponent,
    TestpageComponent,
    TaxtypeComponent,
    ReconsiletypeComponent
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

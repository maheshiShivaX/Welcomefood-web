import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MystoreComponent } from './mystore/mystore.component';
import { MoneyinComponent } from './moneyin/moneyin.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductcategoryComponent } from '../master/productcategory/productcategory.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { DailysaleComponent } from './dailysale/dailysale.component';
import { DailysalesexpensesComponent } from './dailysalesexpenses/dailysalesexpenses.component';
import { StoresummaryComponent } from './storesummary/storesummary.component';

const routes: Routes = [
  { path: 'moneyin/:storeId', component: MoneyinComponent },
  {
    path: 'mystore', component: MystoreComponent
  },
  {
    path: 'dashboard', component: DashboardComponent
  },
  { path: 'dailysale/:storeId', component: DailysaleComponent },
  { path: 'dailysalesexpenses/:storeId', component: DailysalesexpensesComponent }
  ,
  {
    path: 'storesummary', component: StoresummaryComponent
  },
]

@NgModule({
  declarations: [
    MystoreComponent,
    MoneyinComponent,
    DashboardComponent,
    DailysaleComponent,
    DailysalesexpensesComponent,
    StoresummaryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes), NgSelectModule, ReactiveFormsModule,
    FormsModule, CarouselModule],
  exports: [
    DailysalesexpensesComponent
  ]
})
export class StoreModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterLink, RouterModule, Routes } from '@angular/router';
import { MystoreComponent } from './mystore/mystore.component';
import { LoginComponent } from './login/login.component';
import { UserloginformComponent } from './userloginform/userloginform.component';
import { StorereportsComponent } from './storereports/storereports.component';
import { SalesreportsComponent } from './salesreports/salesreports.component';
import { GasreportsComponent } from './gasreports/gasreports.component';
import { ExpensesreportsComponent } from './expensesreports/expensesreports.component';
import { PurchasesreportsComponent } from './purchasesreports/purchasesreports.component';
import { OnlineincomereportsComponent } from './onlineincomereports/onlineincomereports.component';
import { PaymentsreportsComponent } from './paymentsreports/paymentsreports.component';
import { DepartmentComponent } from './department/department.component';
import { SourcesComponent } from './sources/sources.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { StoreentryformComponent } from './storeentryform/storeentryform.component';
import { ProfiledetailComponent } from './profiledetail/profiledetail.component';
import { SettingComponent } from './setting/setting.component';
import { WorkComponent } from './work/work.component';
import { TermsComponent } from './terms/terms.component';
import { PolicyComponent } from './policy/policy.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { FaqComponent } from './faq/faq.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { DailysalesComponent } from './dailysales/dailysales.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { DailysalesexpensesComponent } from './dailysalesexpenses/dailysalesexpenses.component';


const routes: Routes = [
  

  
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'mystore',
    component: MystoreComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'userloginform',
    component: UserloginformComponent,
  },
  {
    path: 'storereports',
    component: StorereportsComponent,
  },
  {
    path: 'salesreports',
    component: SalesreportsComponent,
  },
  {
    path: 'gasreports',
    component: GasreportsComponent,
  },
  {
    path: 'expensesreports',
    component: ExpensesreportsComponent,
  },
  {
    path: 'purchasesreports',
    component: PurchasesreportsComponent,
  },
  {
    path: 'onlineincomereports',
    component: OnlineincomereportsComponent,
  },
  {
    path: 'paymentsreports',
    component: PaymentsreportsComponent,
  },
  {
    path: 'department',
    component: DepartmentComponent,
  },
  {
    path: 'sources',
    component: SourcesComponent,
  },
  {
    path: 'expenses',
    component: ExpensesComponent,
  },
  {
    path: 'storeentryform',
    component: StoreentryformComponent,
  },
  {
    path: 'profiledetail',
    component: ProfiledetailComponent,
  },
  {
    path: 'setting',
    component: SettingComponent,
  },
  {
    path: 'work',
    component: WorkComponent,
  },
  {
    path: 'terms',
    component: TermsComponent,
  },
  {
    path: 'policy',
    component: PolicyComponent,
  },
  {
    path: 'aboutus',
    component: AboutusComponent,
  },
  {
    path: 'faq',
    component: FaqComponent,
  },
  {
    path: 'changepassword',
    component: ChangepasswordComponent,
  },
  {
    path: 'dailysales',
    component: DailysalesComponent,
  },
  {
    path: 'dailysalesexpenses',
    component: DailysalesexpensesComponent,
  },


]

@NgModule({
  declarations: [ DashboardComponent, MystoreComponent, LoginComponent, UserloginformComponent, StorereportsComponent,
     SalesreportsComponent, GasreportsComponent, ExpensesreportsComponent, PurchasesreportsComponent, OnlineincomereportsComponent,
      PaymentsreportsComponent, DepartmentComponent, SourcesComponent, ExpensesComponent, StoreentryformComponent, ProfiledetailComponent, SettingComponent, WorkComponent, TermsComponent, PolicyComponent, AboutusComponent, FaqComponent, ChangepasswordComponent, DailysalesComponent, DailysalesexpensesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgSelectModule,CarouselModule  ]
})
export class PublicModule { }

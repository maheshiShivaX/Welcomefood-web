import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManagestoreComponent } from './managestore/managestore.component';
import { ManageemployeeComponent } from './manageemployee/manageemployee.component';
import { ManagelogindetailsComponent } from './managelogindetails/managelogindetails.component';
import { AssignstoreComponent } from './assignstore/assignstore.component';
import { ManagestoreproductComponent } from './managestoreproduct/managestoreproduct.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { VendorComponent } from './vendor/vendor.component';
import { OnboardstoreComponent } from './onboardstore/onboardstore.component';


const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'managestore', component: ManagestoreComponent },
  { path: 'manageemployee', component: ManageemployeeComponent },
  { path: 'managelogindetails', component: ManagelogindetailsComponent },
  { path: 'assignstore', component: AssignstoreComponent },
  { path: 'managestoreproduct', component: ManagestoreproductComponent },
  { path: 'managestoreproduct/:storeId', component: ManagestoreproductComponent },
  { path: 'vendor', component: VendorComponent },
  { path: 'onboardstore', component: OnboardstoreComponent },
  { path: 'onboardstore/:storeId', component: OnboardstoreComponent },
]

@NgModule({
  declarations: [
    DashboardComponent,
    ManagestoreComponent,
    ManageemployeeComponent,
    ManagelogindetailsComponent,
    AssignstoreComponent,
    ManagestoreproductComponent,
    VendorComponent,
    OnboardstoreComponent,

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule
  ]
})
export class AdminModule { }

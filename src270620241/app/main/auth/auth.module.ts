import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogindetailComponent } from './logindetail/logindetail.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: 'logindetail', component: LogindetailComponent },
  {
    path: 'forgotpassword', component: ForgotpasswordComponent
  },
  {
    path: 'resetpassword', component: ResetpasswordComponent
  }
]

@NgModule({
  declarations: [
    LogindetailComponent,
    ForgotpasswordComponent,
    ResetpasswordComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class AuthModule { }

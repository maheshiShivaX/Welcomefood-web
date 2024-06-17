import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './main/layout/layout.module';

import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { NgSelectModule } from '@ng-select/ng-select';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { CarouselModule } from 'ngx-owl-carousel-o';



const appRoutes: Routes = [
  {
    path: 'public',
    loadChildren: () => import('./main/public/public.module').then(m => m.PublicModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./main/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./main/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'master',
    loadChildren: () => import('./main/master/master.module').then(m => m.MasterModule)
  }, {
    path: 'store',
    loadChildren: () => import('./main/store/store.module').then(m => m.StoreModule)
  }
  ,{
    path: '',
    redirectTo: 'public/dashboard',
    pathMatch: 'full'
  },
]
const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'top', // Scroll to top when navigating
  useHash: false // Use HTML5 history mode (no hash in URLs)
};

@NgModule({
  declarations: [
    AppComponent,


  ],
  imports: [
   // BrowserModule,
    AppRoutingModule,
    LayoutModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    ToastrModule.forRoot(),
    NgSelectModule,
    BrowserAnimationsModule,
    CarouselModule
  ],
  providers: [ {provide: LocationStrategy, useClass: HashLocationStrategy},],
  bootstrap: [AppComponent]
})
export class AppModule { }

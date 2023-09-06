import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxLoadingModule } from 'ngx-loading';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from '../material.module';
import { AdminComponent } from './admin/admin.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { ProductsComponent } from './products/products.component';
import { AddDepComponent } from './department/add-dep/add-dep.component';

import { departmentComponent } from './department/department.component';
 import { AddProductComponent } from './admin/add-product/add-product.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EditProductComponent } from './admin/edit-product/edit-product.component';
import { UpdatePasswordComponent } from './my-profile/update-password/update-password.component';
import { HeaderComponent, DialogOverviewExampleDialog } from './header/header.component';
import { SidenavbarComponent } from './sidenavbar/sidenavbar.component';
import { LogoutDialogComponent } from './header/logout-dialog/logout-dialog.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from './register/register.component';
import { PersonnelleComponent } from './personnelle/personnelle.component';
import { EditDepComponent } from './department/edit-dep/edit-dep.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent, departmentComponent,
    AdminComponent,
    // DistributerComponent,
    // RetailerComponent,
    UpdatePasswordComponent,
    EditDepComponent, AddDepComponent,EditProductComponent,  HeaderComponent, SidenavbarComponent,DialogOverviewExampleDialog, LogoutDialogComponent
   ,MyProfileComponent, PageNotFoundComponent, RegisterComponent,PersonnelleComponent,AddProductComponent ,ProductsComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    NoopAnimationsModule,
    NgbModule,
    NgxLoadingModule.forRoot({})

  ],
  entryComponents: [DialogOverviewExampleDialog],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
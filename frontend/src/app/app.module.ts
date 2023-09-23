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

import { MyProfileComponent } from './my-profile/my-profile.component';
import { EquipementsComponent } from './equipement/equipements.component';
import { AddDepComponent } from './department/add-dep/add-dep.component';

import { departmentComponent } from './department/department.component';
 import { AddEquipementComponent } from './equipement/add-equipement/add-equipement.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EditEquipementComponent } from './equipement/edit-equipement/edit-equipement.component';
import { UpdatePasswordComponent } from './my-profile/update-password/update-password.component';
import { HeaderComponent, DialogOverviewExampleDialog } from './header/header.component';
import { SidenavbarComponent } from './sidenavbar/sidenavbar.component';
import { LogoutDialogComponent } from './header/logout-dialog/logout-dialog.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from './register/register.component';
import { AddPersonnelleComponent } from './personnelle/add-personnelle.component';
import { EditDepComponent } from './department/edit-dep/edit-dep.component';
import { AddEntiteComponent } from './Entite/add-entite/add-entite.component';
  import { GetAllentitesComponent } from './Entite/get-all-entites/get-all-entites.component';
import { PersonnellesComponent } from './personnelle/personnelle/personnelles.component';
import { EditPersonnelleComponent } from './personnelle/edit-personnelle/edit-personnelle.component';
import { hover } from './header/hover.component';
import { AddburoComponent } from './buro/add-buro/add-buro.component';
import { AddetageComponent } from './etage/add-etage/add-etage.component';
import { admin } from './admin/home/admin.component';
// import { GetentiteByCategoryComponent } from './Entite/get-entite-by-category/get-entite-by-category.component';
// import { UpdateEntiteComponent } from './Entite/update-entite/update-entite.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent, departmentComponent, 
    // DistributerComponent,
    AddEquipementComponent,EditEquipementComponent,
    // RetailerComponent,
    AddEntiteComponent,GetAllentitesComponent,//GetentiteByCategoryComponent,UpdateEntiteComponent,
    UpdatePasswordComponent,
    EditDepComponent, AddDepComponent,   HeaderComponent, SidenavbarComponent,DialogOverviewExampleDialog, LogoutDialogComponent
  ,EditPersonnelleComponent ,MyProfileComponent,PersonnellesComponent, PageNotFoundComponent, RegisterComponent,AddPersonnelleComponent,
  EquipementsComponent,hover,AddburoComponent,admin,
 AddetageComponent ],
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
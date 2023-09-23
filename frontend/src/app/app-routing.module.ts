import { NgModule } from '@angular/core';
import { AuthGaurdService } from './services/auth-gaurd-service.service';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component'; 
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { AddDepComponent } from './department/add-dep/add-dep.component';
import { UpdatePasswordComponent } from './my-profile/update-password/update-password.component';
import { departmentComponent } from './department/department.component';
import { RegisterComponent } from './register/register.component';
import { AddPersonnelleComponent } from './personnelle/add-personnelle.component';
import { EditDepComponent } from './department/edit-dep/edit-dep.component';
import { SidenavbarComponent } from './sidenavbar/sidenavbar.component';
// import { GetentiteByCategoryComponent } from './Entite/get-entite-by-category/get-entite-by-category.component';
// import { UpdateEntiteComponent } from './Entite/update-entite/update-entite.component';
import { GetAllentitesComponent } from './Entite/get-all-entites/get-all-entites.component';
import { AddEntiteComponent } from './Entite/add-entite/add-entite.component';
import { PersonnellesComponent } from './personnelle/personnelle/personnelles.component';
import { EditPersonnelleComponent } from './personnelle/edit-personnelle/edit-personnelle.component';
import { EquipementsComponent } from './equipement/equipements.component';
import { AddEquipementComponent } from './equipement/add-equipement/add-equipement.component';
import { EditEquipementComponent } from './equipement/edit-equipement/edit-equipement.component';
import { hover } from './header/hover.component';
import { AddburoComponent } from './buro/add-buro/add-buro.component';
import { AddetageComponent } from './etage/add-etage/add-etage.component';
import { admin } from './admin/home/admin.component';
 
const routes: Routes = [
  {path: "", component: LoginComponent},
  {path: "admin", component: admin},

  {path: 'login' , component: LoginComponent},
  {path: 'sidnavbar' , component: SidenavbarComponent},
  {path: 'update-password' , component: UpdatePasswordComponent,canActivate:[AuthGaurdService]},

   {path: 'add-etage' , component:AddetageComponent },
  {path: 'department' , component: departmentComponent,canActivate:[AuthGaurdService]},
  {path: 'add-buro' , component: AddburoComponent,canActivate:[AuthGaurdService]},
  // {path: 'distributor' , component: DistributerComponent,canActivate:[AuthGaurdService]},
  // {path: 'retailer' , component: RetailerComponent,canActivate:[AuthGaurdService]},
  {path: 'my_profile' , component: MyProfileComponent ,canActivate:[AuthGaurdService]},
  {path: 'add-dep' , component: AddDepComponent ,canActivate:[AuthGaurdService]},
  //  {path: 'add-retailer' , component: AddNewRetailerComponent },
   {path: 'edit-department' , component: EditDepComponent,canActivate:[AuthGaurdService]},
  {path: 'add-personnel' , component: AddPersonnelleComponent ,canActivate:[AuthGaurdService]},
   {path: 'page-not-found' , component: PageNotFoundComponent},
   {path: 'personnelle' , component: PersonnellesComponent,canActivate:[AuthGaurdService]},
  {path: 'register' , component: RegisterComponent},
  {path: 'edit-equipment' , component: EditEquipementComponent,canActivate:[AuthGaurdService]},
  {path: 'add-equipment' , component: AddEquipementComponent,canActivate:[AuthGaurdService]},
  {path: 'equipement' , component: EquipementsComponent,canActivate:[AuthGaurdService]},
  {path: 'getallentite' , component: GetAllentitesComponent,canActivate:[AuthGaurdService]},
  {path: 'addentite' , component:AddEntiteComponent ,canActivate:[AuthGaurdService]},
   {path:'edit-personnelle',component:EditPersonnelleComponent,canActivate:[AuthGaurdService]},
   {path:'hover',component:hover},
  
  {path: '**' ,redirectTo: ('/page-not-found')},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const RoutingComponents = [LoginComponent, RegisterComponent];
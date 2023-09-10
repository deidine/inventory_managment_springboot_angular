import { NgModule } from '@angular/core';
import { AuthGaurdService } from './services/auth-gaurd-service.service';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { AddDepComponent } from './department/add-dep/add-dep.component';
 import { EditProductComponent } from './admin/edit-product/edit-product.component';
import { ProductsComponent } from './products/products.component';
import { UpdatePasswordComponent } from './my-profile/update-password/update-password.component';
import { departmentComponent } from './department/department.component';
import { RegisterComponent } from './register/register.component';
import { PersonnelleComponent } from './personnelle/personnelle.component';
import { EditDepComponent } from './department/edit-dep/edit-dep.component';
import { SidenavbarComponent } from './sidenavbar/sidenavbar.component';
// import { GetentiteByCategoryComponent } from './Entite/get-entite-by-category/get-entite-by-category.component';
// import { UpdateEntiteComponent } from './Entite/update-entite/update-entite.component';
import { GetAllentitesComponent } from './Entite/get-all-entites/get-all-entites.component';
import { AddEntiteComponent } from './Entite/add-entite/add-entite.component';
 
const routes: Routes = [
  {path: "", component: LoginComponent},
  {path: 'login' , component: LoginComponent},
  {path: 'sidnavbar' , component: SidenavbarComponent},
  {path: 'department' , component: departmentComponent},
  {path: 'update-password' , component: UpdatePasswordComponent,canActivate:[AuthGaurdService]},

  // {path: 'distributor' , component: DistributerComponent,canActivate:[AuthGaurdService]},
  // {path: 'retailer' , component: RetailerComponent,canActivate:[AuthGaurdService]},
  {path: 'my_profile' , component: MyProfileComponent },
  {path: 'add-product' , component: AddProductComponent },
  {path: 'add-dep' , component: AddDepComponent },
  {path: 'edit-product' , component: EditProductComponent },
  //  {path: 'add-retailer' , component: AddNewRetailerComponent },
   {path: 'edit-department' , component: EditDepComponent},
  {path: 'products' , component: ProductsComponent,canActivate:[AuthGaurdService] },
  {path: 'personnelle' , component: PersonnelleComponent },
   {path: 'page-not-found' , component: PageNotFoundComponent},
  {path: 'register' , component: RegisterComponent},
  // {path: 'getbycat' , component: GetentiteByCategoryComponent},
  // {path: 'updateentite' , component: UpdateEntiteComponent},
  {path: 'getallentite' , component: GetAllentitesComponent},
  {path: 'addentite' , component:AddEntiteComponent },
   
  
  {path: '**' ,redirectTo: ('/page-not-found')},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const RoutingComponents = [LoginComponent,
                                  AdminComponent,RegisterComponent];
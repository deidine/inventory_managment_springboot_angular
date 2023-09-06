 
import { Product } from './../model/product';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Component, OnInit, ErrorHandler } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ProductService } from '../service/product.service';
import { UserProfile } from 'src/app/models/UserModels';
import { LoginCheckService } from 'src/app/login/services/login-check.service';

@Component({
  selector: 'add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  public product : Product =  new Product();
 
  public userName = localStorage.getItem("currentUserName");
 
  public myProfile : UserProfile;
  
  constructor(private fb: FormBuilder ,
    private router :Router, 
    private userProfileService : LoginCheckService,
    private productService : ProductService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    
  }

  getProfile(){
    let id = localStorage.getItem("currentUserId");

    console.log("User Id is "+ id);

    this.userProfileService.getUserDetails(id).subscribe(
      res => this.handleSuccessfulResponse(res),
      err => this.handleSuccessfulResponse(err),
      () => ''
    );


  }

  handleSuccessfulResponse(response)
  {
    this.myProfile = response;
    this.userName = this.myProfile.username;
  }

  onClickProfile(){
    
    this.router.navigate(['/my_profile']);

  }

  onClickLogout(){
    console.log("Logout Clicked");
    
      console.log("cleared User Id "+localStorage.getItem("currentUserId") );
      localStorage.clear();

      this.snackBar.open("User Logged Out", "Close", {
        duration: 5000,verticalPosition: 'top',panelClass: ['green-snackbar']
      });
      
      this.router.navigate(['']);
    
  }

  public stringRegex : RegExp = /^[a-zA-Z]+(([',. -][a-zA-Z0-9 ])?[a-zA-Z0-9]*)*$/ ;
  public costRegex : RegExp = /^[0-9]*$/ ;
  

  addProductForm : FormGroup = this.fb.group({
    prodName : ['',[Validators.required,Validators.pattern(this.stringRegex)]],
    prodCost : ['',[Validators.required,Validators.pattern(this.costRegex)]],
    prodStatus : ['active',[Validators.required]],
  });

  get f() { return this.addProductForm.controls; }

  onSubmit(){

    this.product.productName = this.f.prodName.value;
    this.product.productCost = this.f.prodCost.value;
    this.product.productStatus = 'active';

    // console.log(this.f.prodName.value);
    // console.log(this.f.prodCost.value);
    // console.log(this.f.prodStatus.value);

    this.productService.save(this.product).subscribe(
      response => this.Handler(response)
    );

  }

  Handler(response){

    console.log("Responce : " + response);

    this.snackBar.open("New Product Added", "Close", {
      duration: 2000,verticalPosition: 'top',panelClass: ['green-snackbar']
    });

    this.router.navigate(['/products']);
    
  }

  handle(resp){
    console.log("Product list refreshed");

  }

  onClickCancel(){

    
      this.router.navigate(['/products']);  
    
  
  }

}

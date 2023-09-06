
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { UserProfile } from 'src/app/models/UserModels';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../service/product.service';
import { Product } from '../model/product';
import { MatSnackBar,} from '@angular/material';

@Component({
  selector: 'edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  displayedColumns: string[] = ['productId','productName', 'productCost', 'productStatus'];

  public userName = localStorage.getItem("currentUserName");
  public myProfile : UserProfile;

  products: Product[] ;
  product: Product =new Product() ;
  
  constructor(private router :Router, 
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private snackBar: MatSnackBar,
              private productService: ProductService) { }

  ngOnInit() {
    
    this.productService.getProductById(this.route.queryParams['getValue']()['productId']).subscribe(
      response => this. handle(response)
      );
  }

  handle(response)
  {
    this.product.productId=response.productId;
    this.product.productName=response.productName;
    this.product.productStatus=response.productStatus;
    this.product.productCost=response.productCost;
  }

  onClickUpdateProduct()
  {
    this.productService.updateProduct(this.product).subscribe(
      response => this.productResponse(),
      error => console.error("Product not Updated")
    );
  }

  productResponse()
  {
    console.log("Product Details Updated Successfully");


    this.snackBar.open("Product Updated", "Close", {
      duration: 5000,verticalPosition: 'top',panelClass: ['green-snackbar']
    });

    this.router.navigate(['/products']);
  }
  
  onSubmit(){
    console.log(" Inside Product Details Update");

    this.snackBar.open("Product Updated", "Close", {
      duration: 2000,verticalPosition: 'top',panelClass: ['green-snackbar']
    });
    
    this.productService.updateProduct(this.product).subscribe(asd=>this.router.navigateByUrl('products'));
  }

  onClickProfile(){
    
    this.router.navigate(['/my_profile']);

  }

  onClickLogout(){
    console.log("Logout Clicked");
    
 

      // console.log("cleared User Id "+localStorage.getItem("currentUserId") );
      // localStorage.clear();

      // this.snackBar.open("User Logged Out", "Close", {
      //   duration: 2000,verticalPosition: 'top',panelClass: ['green-snackbar']
      // });
      
      // this.router.navigate(['']);
    
  }

  onClickCancel(){
    this.router.navigate(['/admin']);
  }

  updateProductForm : FormGroup = this.fb.group({
    prodId : ['',[Validators.required]],
    prodName: ['',[Validators.required]],
    prodCost : ['',[Validators.required]],
    prodStatus : ['',[Validators.required]],
  });



}

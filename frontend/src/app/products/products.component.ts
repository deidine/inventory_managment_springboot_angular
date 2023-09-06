// import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar, MatTableDataSource, MatPaginator, Sort, MatSort } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../admin/model/product';
import { ProductService } from '../admin/service/product.service';
import { UserProfile } from '../models/UserModels'; 
import { LoginCheckService } from '../login/services/login-check.service';
@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  
  public userName = localStorage.getItem("currentUserName");

  public user : UserProfile;

  addButton = true;  
  addProduct = false;
  editProductBtn = false;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  
  product: any;

  length :number ;
  pageSize = 5;
  pageSizeOptions: number[] = [2, 5, 10];

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  sortedData: Product = new Product();
  constructor(private productService: ProductService,
              private userProfileService : LoginCheckService,
              private snackBar: MatSnackBar,
              private router :Router,
              ) { 

 }

  ngOnInit() {
    this.productService.getProducts().subscribe(
      response => {
        console.log(response)
        this.product=response;
        this.products = new MatTableDataSource(this.product);
        this.products.sort = this.sort;
        this.length = response.length;
        this.products.paginator = this.paginator;
      });

  }

  public products: MatTableDataSource<any>;

  ngAfterViewInit() {
   
  }

  starter(){
  
  }


  handleSuccessfulResponse(response)
  {
    this.user = response;
    this.userName = this.user.username;
   
  }

  onClickProfile(){
    
    this.router.navigate(['/my_profile']);

  }

  onClickLogout(){
    console.log("Logout Clicked");
    
      console.log("cleared User Id "+localStorage.getItem("currentUserId") );
      localStorage.clear();

      this.snackBar.open("User Logged Out", "Close", {
        duration: 2000,verticalPosition: 'top',panelClass: ['green-snackbar']
      });

      this.router.navigate(['']);
    
  }

  handle(response){
   
  }

  displayedColumns: string[] = ['productEmail','productId','productStatus',  'productCost' , 'edit' ];

  editProduct(element){
    let productId = element.productId;

    console.log(productId);

    this.router.navigate(['/edit-product'],{queryParams:{productId:productId}})
  }


  handleUpdate(resp){
    console.log("Updated Product");

    this.snackBar.open("Product Updated", "Close", {
      duration: 4000,verticalPosition: 'top',panelClass: ['green-snackbar']
    });

    this.productService.getProducts().subscribe(response => this.handle(response));

  }

  public onClickCancel(){
    this.addButton=!this.addButton;
    this.addProduct=!this.addProduct;
    this.productService.getProducts().subscribe(response => this.handle(response));

  }

  onClickAddProduct(){
   
    console.log("Routing to add New_product page");

    this.router.navigate(['/add-product']);

  }

  // sortData(sort: Sort) {
  //   const data = this.products.slice();
  //   if (!sort.active || sort.direction === '') {
  //     this.sortedData = data;
  //     return;
  //   }

  //   this.sortedData = data.sort((a, b) => {
  //     const isAsc = sort.direction === 'asc';
  //     switch (sort.active) {
  //       case 'productId': return compare(a.productId, b.productId, isAsc);
  //       case 'productName': return compare(a.productName, b.productName, isAsc);
  //       case 'productStatus': return compare(a.productStatus, b.productStatus, isAsc);
  //       case 'productCost': return compare(a.productCost, b.productCost, isAsc);
  //       default: return 0;
  //     }
  //   });
  // }

}

// function compare(a: number | string, b: number | string, isAsc: boolean) {
//   return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
// }
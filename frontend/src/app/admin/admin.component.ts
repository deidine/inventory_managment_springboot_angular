import { Component, OnInit } from '@angular/core';
 import { Router } from '@angular/router';
import { UserProfile } from '../models/UserModels';
import { MatSnackBar } from '@angular/material';
import { LoginCheckService } from '../login/services/login-check.service';
LoginCheckService
@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent 
 {
  public userName = localStorage.getItem("currentUserName");

  public user : UserProfile;

  public homePage = true;
  public showProfile = false;
  public showTransactions = false;
  public showDistributers = false;
  public showRequests = false;
  public showProducts = false;

  constructor(private userProfileService : LoginCheckService,
              private router : Router,
              private snackBar: MatSnackBar)
  { }

  ngOnInit() {
    this.starter();    
  }

  starter(){
    this.isAdmin();

  }

  isAdmin(){
    if( localStorage.getItem("currentUserRole") != null )
    {
      if( localStorage.getItem("currentUserRole") === '1' )
      {
        console.log("User is logged in as Admin");

      }
      else if( localStorage.getItem("currentUserRole") === '2' )
      {
        this.router.navigate(['/distributor']);
      }

      else if( localStorage.getItem("currentUserRole") === '3' )
      {
        this.router.navigate(['/retailer']);
      }
    }
  
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

  onClickTransactions(){
    console.log("Transactions Panel Clicked");

    this.homePage = false;
    this.showProfile = false;
    this.showTransactions = true;
    this.showDistributers = false;
    this.showRequests = false;  
    this.showProducts = false;


  }

  onClickDistributers(){
    console.log("Distributers Panel Clicked");
 
    this.homePage = false;
    this.showProfile = false;
    this.showTransactions = false;
    this.showDistributers = true;
    this.showRequests = false;  
    this.showProducts = false;
 }

  onClickRequests(){
    console.log("Requests Panel Clicked");

    this.homePage = false;
    this.showProfile = false;
    this.showTransactions = false;
    this.showDistributers = false;
    this.showRequests = true;  
    this.showProducts = false;
  
  }

  onClickProducts(){
    console.log("Products Panel Clicked");

    this.homePage = false;
    this.showProfile = false;
    this.showTransactions = false;
    this.showDistributers = false;
    this.showRequests = false;  
    this.showProducts = true;
}

}

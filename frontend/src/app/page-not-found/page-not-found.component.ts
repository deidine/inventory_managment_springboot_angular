import { Component, OnInit } from '@angular/core';
import { UserProfile } from '../models/UserModels';
import { Router } from '@angular/router';
 import { MatSnackBar } from '@angular/material';
import { LoginCheckService } from '../login/services/login-check.service';

@Component({
  selector: 'page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  adminSidepanel = false;
  distributorSidePanel = false;
  retailerSidePanel = false;

  public userName = localStorage.getItem("currentUserName");
  
  public user : UserProfile;
  
  constructor(private userProfileService : LoginCheckService,
              private router : Router,
              private snackBar: MatSnackBar){}

  ngOnInit() {
    this.activeSidePanel();
   
  }

  activeSidePanel(){
    let userRole = localStorage.getItem("currentUserRole");
    
    if(userRole === '1')
    {
      this.adminSidepanel = true;
    }
    else if(userRole === '2')
    {
      this.distributorSidePanel = true;
    }
    else if(userRole === '3')
    {
      this.retailerSidePanel = true;
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


}

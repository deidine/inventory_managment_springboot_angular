import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserProfile } from '../models/UserModels';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material';
import { LoginCheckService } from '../login/services/login-check.service';

@Component({
  selector: 'my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  adminSidepanel = false;
  distributorSidePanel = false;
  retailerSidePanel = false;

  public updateDetails: UserProfile = new UserProfile();

  public username = " ";
  public myProfile: UserProfile;

  public profileForm: FormGroup = this.fb.group({
    profileName: ['', [Validators.required]],
    profileEmail: [{ value: '', disabled: true }],
    profileContact: [{ value: '', disabled: true }],
    profilePassword: ['', [Validators.required, Validators.minLength(6)]],
    profileAddress: ['', [Validators.required]],
    profileArea: [{ value: '', disabled: true }],
  });


  get f() { return this.profileForm.controls; }


  constructor(private fb: FormBuilder,
    private userProfileService: LoginCheckService,
    private myProfileUpdater: UserService,
    private router: Router,
    private snackBar: MatSnackBar) { }
    
    ngOnInit() {
      this.starter(); 
      console.log("cleared User deidine Id " + localStorage.getItem("auth-user"));
      console.log("user tokekne "+localStorage.getItem("UserToken"))

  }

  starter() {
    this.activeSidePanel();
    this.getProfile();
  }
  activeSidePanel() {
    let userRole = localStorage.getItem("currentUserRole");

    if (userRole === '1') {
      this.adminSidepanel = true;
    }
    else if (userRole === '2') {
      this.distributorSidePanel = true;
    }
    else if (userRole === '3') {
      this.retailerSidePanel = true;
    }

  }


  onClickProfile() {

    this.router.navigate(['/my_profile']);

  }

  onClickLogout() {
    console.log("Logout Clicked");

    console.log("cleared User Id " + localStorage.getItem("currentUserId"));
    localStorage.clear();

    this.snackBar.open("User Logged Out", "Close", {
      duration: 2000, verticalPosition: 'top', panelClass: ['green-snackbar']
    });

    window.sessionStorage.clear()
    this.router.navigate(['']);
  }

  getProfile() {
    let id: any = localStorage.getItem("currentUserId"); 
    this.username = localStorage.getItem("currentUserName");
    console.log("User Id is " + id);

    this.userProfileService.getUserDetails(id).subscribe(
      res => this.handleSuccessfulResponse(res),
      err => this.handleSuccessfulResponse(err),
      () => ''
    );


  }

  handleSuccessfulResponse(response) {
    this.myProfile = response;
    this.username = this.myProfile.username;


    this.profileForm.patchValue({
      profileName: this.myProfile.username,
      profileEmail: this.myProfile.email,
      profileContact: this.myProfile.contactno,
      profilePassword: "************",
      profileAddress: this.myProfile.password,
      profileArea: this.myProfile.appUserRoles
    });

  }

  onClickUpdateProfile() {

    console.log("Updated user profile with new details");

    this.updateDetails.username = this.f.profileName.value;
    this.updateDetails.email = this.f.profileEmail.value;
    this.updateDetails.contactno = this.f.profileContact.value;
    this.updateDetails.password = this.f.profilePassword.value;
    this.updateDetails.personalAddress = this.f.profileAddress.value;
    this.updateDetails.area = this.f.profileArea.value;

    this.myProfileUpdater.updateMyProfile(this.updateDetails).subscribe(
      response => {
        localStorage.setItem("currentusername", this.updateDetails.username);
        this.snackBar.open("Profile Updated", "Close", {
          duration: 2000, verticalPosition: 'top', panelClass: ['green-snackbar']
        });

        this.ngOnInit();
      },
      error => { }
    );




  }

  onClickUpdatePassword() {
    this.router.navigate(['/update-password']);
  }

  onClickCancel() {

    let uRole = localStorage.getItem("currentUserRole");

    if (uRole === '1') {
      this.router.navigate(['/admin']);
    }
    else if (uRole === '2') {
      this.router.navigate(['/distributor']);
    }
    else if (uRole === '3') {
      this.router.navigate(['/retailer']);
    }

  }


}

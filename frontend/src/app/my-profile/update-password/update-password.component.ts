import { MatSnackBar, ErrorStateMatcher } from '@angular/material';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { PasswordUpdator } from 'src/app/models/UserModels';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {

  adminSidepanel = false;
  distributorSidePanel = false;
  retailerSidePanel = false;

  public passwordUpdator : PasswordUpdator = new PasswordUpdator();

  public userName = localStorage.getItem("currentUserName");
  
  
  hide = true;

  // public passwordForm : FormGroup  = this.fb.group({
  //   oldPassword: ['',[Validators.required,Validators.minLength(6)]],
  //   newPassword: ['',[Validators.required,Validators.minLength(6)]],
  //   confirmPassword: ['',[Validators.required,Validators.minLength(6)]],
  // });

  checkPasswords(group: FormGroup) { 
  let pass = group.controls.newPassword.value;
  let confirmPass = group.controls.confirmPassword.value;

  return pass === confirmPass ? null : { notSame: true }     
  }

  // get f() { return this.passwordForm.controls; }

  
  constructor(private fb: FormBuilder ,
              private myProfileUpdater :UserService,
              private router :Router,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.starter();
  }

  starter(){
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

  onClickUpdatePassword(){

    this.passwordUpdator.userId = parseInt(localStorage.getItem("currentUserId"));

    console.log("Inside onClickUpdatePassword method" );
    
    // this.passwordUpdator.userId = parseInt(localStorage.getItem("currentUserId"));
    // this.passwordUpdator.oldPassword = this.f.oldPassword.value;
    // this.passwordUpdator.newPassword  = this.f.newPassword.value;
   
    this.myProfileUpdater.updatePassword(this.passwordUpdator).subscribe(
      resp => this.handle(resp),
      err => this.errorHandle(err),
      () => '' 
    );

    

  }

  handle(resp)
  {
    this.snackBar.open("Password Changed", "Close", {
      duration: 2000,verticalPosition: 'top',panelClass: ['green-snackbar']
    });

    this.router.navigate(['/my_profile']);  
  }

  errorHandle(error)
  {

    console.error("Error Responced"+error.value);

    this.snackBar.open("Error Occured", "Failure!!", {
      duration: 2000,verticalPosition: 'top',panelClass: ['green-snackbar']
    });

  }

  onClickCancel(){

    let uRole = localStorage.getItem("currentUserRole");

      this.router.navigate(['/my_profile']);  
    
    
  }

  
}


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}
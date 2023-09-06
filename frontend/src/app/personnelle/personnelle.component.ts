import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Personnelle, UserProfile } from '../models/UserModels';
import { MatSnackBar } from '@angular/material'; 
import { PersonnelleService } from './personnelle.service';

import { ProductService } from '../admin/service/product.service';
import { LoginCheckService } from '../login/services/login-check.service';
 @Component({
  selector: 'personnelle',
  templateUrl: './personnelle.component.html',
  styleUrls: ['./personnelle.component.css']
})
export class PersonnelleComponent implements OnInit {

  loading = false;

  public emailregex: RegExp = /[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,5}/;
  public stringRegex: RegExp = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;

  formError = false;

  public user: Personnelle = new Personnelle();
  public userName = localStorage.getItem("currentUserName");

  public myProfile: UserProfile;

  constructor(private fb: FormBuilder,
    private router: Router,
    private userProfileService: LoginCheckService,
    private personnelleService: PersonnelleService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {

  }

  onClickProfile() {

    this.router.navigate(['/my_profile']);

  }

  onClickLogout() {
    console.log("Logout Clicked");

    console.log("cleared User Id " + localStorage.getItem("currentUserId"));
    localStorage.clear();

    this.snackBar.open("User Logged Out", "Close", {
      duration: 5000, verticalPosition: 'top', panelClass: ['green-snackbar']
    });

    this.router.navigate(['']);



  }

  onClickCancel() {
    this.router.navigate(['/distributors-list']);
  }

  addUserForm: FormGroup = this.fb.group({
    retName: ['', [Validators.required, Validators.pattern(this.stringRegex)]],
    retEmail: ['', [Validators.required, Validators.pattern(this.emailregex)]],
    retFn_dans_entite: ['', [Validators.required, Validators.pattern(this.stringRegex)]],
    retPhone: ['', [Validators.required, 
    Validators.maxLength(10), Validators.pattern("[1-9]{1}[0-9]{9}")]],
    retRole: ['', [Validators.required,Validators.pattern(this.stringRegex)]],
    retId_buro: ['', [Validators.required ]],
  });

  get f() { return this.addUserForm.controls; }

  onSubmit() {

    this.loading = true;

    this.user.telephone = this.f.retPhone.value;
    this.user.email = this.f.retEmail.value;
    this.user.fn_dans_entite = this.f.retFn_dans_entite.value;
    this.user.id_bur = this.f.retId_buro.value;
    this.user.role_systm = this.f.retRole.value;
    this.user.nom = this.f.retName.value;
    // this.user.roleType = 2;

    console.log(this.user);

    this.personnelleService.registerPersonnelle(this.user).subscribe(
      response => {
        alert(this.user)

        this.loading = false;
        this.handleSuccessfulResponse(response);
      },
      err => {
        alert("eroor"+this.user.fn_dans_entite)
        this.loading = false;
        this.errorResponse(err);
      }
    );

  }

  handleSuccessfulResponse(response) {
    let resp = response;

    console.log("Responce : " + resp);

    this.snackBar.open("User Added", "Close", {
      duration: 5000, verticalPosition: 'top', panelClass: ['green-snackbar']
    });

    this.router.navigate(['/distributors-list']);
  }

  errorResponse(error) {
    this.formError = true;
    console.error("Error in submission" + error);
  }

}

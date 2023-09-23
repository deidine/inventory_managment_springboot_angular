import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
// import { Personnelle2 } from '../models/UserModels';
import { Personnelle } from './Personnelle';
import { Buro } from 'src/app/models/buro'
import { BuroService } from 'src/app/services/buro.service';

import { MatSnackBar } from '@angular/material';
import { PersonnelleService } from './personnelle.service';

import { LoginCheckService } from '../login/services/login-check.service';
@Component({
  selector: 'add-personnelle',
  templateUrl: './add-personnelle.component.html',
  styleUrls: ['./add-personnelle.component.css']
})
export class AddPersonnelleComponent implements OnInit {

  loading = false;
  public emailregex: RegExp = /[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,5}/;
  public stringRegex: RegExp = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
  buro: Buro = new Buro();

  formError = false;

  public user: Personnelle = new Personnelle();
  public userName = localStorage.getItem("currentUserName");
  buroList: Buro[];

  constructor(private fb: FormBuilder,
    private router: Router,private buroService: BuroService ,
    private userProfileService: LoginCheckService,
    private personnelleService: PersonnelleService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
       this.buroService.getBuros().subscribe(data => {
        this.buroList = data;
        
        console.log(this.buroList+"deidineiidienidn")
      });

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
    retRole: ['', [Validators.required, Validators.pattern(this.stringRegex)]],
    buro_numero: ['', [Validators.required]],
  });

  get f() { return this.addUserForm.controls; }

  onSubmit() {

    this.loading = true;

    this.buro.id=this.f.buro_numero.value
    this.user.telephone = this.f.retPhone.value;
    this.user.email = this.f.retEmail.value;
    this.user.fn_dans_entite = this.f.retFn_dans_entite.value;
    this.user.buro = this.buro;
    this.user.role_systm = this.f.retRole.value;
    this.user.nom = this.f.retName.value;
    // this.user.roleType = 2;

    console.log(this.user);

    this.personnelleService.save(this.user).subscribe(
      response => {
        alert(this.user)

        this.loading = false;
        this.handleSuccessfulResponse(response);
      },
      err => {
        alert("eroor" + this.user.fn_dans_entite)
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

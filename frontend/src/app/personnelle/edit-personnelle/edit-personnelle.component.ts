import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
// import { Personnelle2 } from '../models/personnelleModels';
import { Personnelle } from '../Personnelle';

import { MatSnackBar } from '@angular/material'; 
import { PersonnelleService } from '../personnelle.service';
 
import { LoginCheckService } from '../../login/services/login-check.service';
 @Component({
  selector: 'edit-personnelle',
  templateUrl: './edit-personnelle.component.html',
  styleUrls: ['./edit-personnelle.component.css']
})
export class EditPersonnelleComponent implements OnInit {

  loading = false;

  public emailregex: RegExp = /[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,5}/;
  public stringRegex: RegExp = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;

  formError = false;
id:any;
  public personnelle: Personnelle = new Personnelle();
  public personnelleName = localStorage.getItem("currentpersonnelleName");
 
  constructor(private fb: FormBuilder,
    private router: Router,
    private personnelleProfileService: LoginCheckService,
    private route: ActivatedRoute,

    private personnelleService: PersonnelleService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.id=this.route.queryParams['getValue']()['personnelleId']
     
    this.personnelleService.getPersonnelleById(this.id).subscribe(
      resp => {
        //this.handle(response)
        this.personnelle.telephone = resp.telephone;
        this.personnelle.email = resp.email;
        this.personnelle.fn_dans_entite = resp.fn_dans_entite;
        this.personnelle.buro= resp.buro;
        this.personnelle.role_systm = resp.role_systm;
        this.personnelle.nom = resp.nom;
          }
    );
  }

  onClickProfile() {

    this.router.navigate(['/my_profile']);

  }

  onClickLogout() {
    console.log("Logout Clicked");

    console.log("cleared personnelle Id " + localStorage.getItem("currentpersonnelleId"));
    localStorage.clear();

    this.snackBar.open("personnelle Logged Out", "Close", {
      duration: 5000, verticalPosition: 'top', panelClass: ['green-snackbar']
    });

    this.router.navigate(['']);



  }

  onClickCancel() {
    this.router.navigate(['/distributors-list']);
  }

  addpersonnelleForm: FormGroup = this.fb.group({
    retName: ['', [Validators.required, Validators.pattern(this.stringRegex)]],
    retEmail: ['', [Validators.required, Validators.pattern(this.emailregex)]],
    retFn_dans_entite: ['', [Validators.required, Validators.pattern(this.stringRegex)]],
    retPhone: ['', [Validators.required, 
    Validators.maxLength(10), Validators.pattern("[1-9]{1}[0-9]{9}")]],
    retRole: ['', [Validators.required,Validators.pattern(this.stringRegex)]],
    retId_buro: ['', [Validators.required ]],
  });

  get f() { return this.addpersonnelleForm.controls; }

  onSubmit() {

    this.loading = true;

 
    console.log(this.personnelle);

    this.personnelleService.updatePersonnelle(this.personnelle,this.id).subscribe(
      response => {
        alert(this.personnelle)

        this.loading = false;
        this.handleSuccessfulResponse(response);
      },
      err => {
        alert("eroor"+this.personnelle.fn_dans_entite)
        this.loading = false;
        this.errorResponse(err);
      }
    );

  }

  handleSuccessfulResponse(response) {
    let resp = response;

    console.log("Responce : " + resp);

    this.snackBar.open("personnelle Added", "Close", {
      duration: 5000, verticalPosition: 'top', panelClass: ['green-snackbar']
    });

    this.router.navigate(['/distributors-list']);
  }

  errorResponse(error) { 
    console.error("Error in submission" + error);
  }

}

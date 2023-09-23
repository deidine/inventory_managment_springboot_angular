 import { Departement } from '../../models/department';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Component, OnInit, ErrorHandler } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DepartementService } from '../../services/department.service';

import { UserProfile } from 'src/app/models/UserModels';
import { LoginCheckService } from 'src/app/login/services/login-check.service';
import { Entite } from 'src/app/Entite/Entite';
import { EntiteService } from 'src/app/Entite/services/entite.service';

@Component({
  selector: 'add-dep',
  templateUrl: './add-dep.component.html',
  styleUrls: ['./add-dep.component.css']
})
export class AddDepComponent implements OnInit {

  public department: Departement = new Departement();
  entiteList:any;

  public userName = localStorage.getItem("currentUserName");
  deidine: any;
  public myProfile: UserProfile;
   entite:Entite=new Entite();
   constructor(private fb: FormBuilder,
    private router: Router,private entiteService: EntiteService,
    private userProfileService: LoginCheckService,
    private departmentService: DepartementService,
    private snackBar: MatSnackBar) { }
    
    ngOnInit() {
      this.deidine = this.f.depName.value

      this.entiteService.getAllEntites().subscribe(data => {
        this.entiteList = data;
        
      });
    }
    
    getProfile() {
      let id = localStorage.getItem("currentUserId");
      
      console.log("User Id is " + id);
      
      this.userProfileService.getUserDetails(id).subscribe(
        res => this.handleSuccessfulResponse(res),
        err => this.handleSuccessfulResponse(err),
        () => ''
        );
        
        
      }
      
      handleSuccessfulResponse(response) {
        this.myProfile = response;
        this.userName = this.myProfile.username;
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
      public stringRegex: RegExp = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
      
      // public stringRegex : RegExp = /^[a-zA-Z]+(([',. -][a-zA-Z0-9 ])?[a-zA-Z0-9]*)*$/ ;
      
  public costRegex: RegExp = /^[0-9]*$/;


  addProductForm: FormGroup = this.fb.group({
    entiteId: ['', [Validators.required]],
    depName: ['', [Validators.required, Validators.pattern(this.stringRegex)]],
    depUrl: ['', [Validators.required, Validators.pattern(this.stringRegex)]],
    depTitre: ['', [Validators.required, Validators.pattern(this.stringRegex)]]
  });

  get f() { return this.addProductForm.controls; }

  onSubmit() {
    this.entite.entiteId=this.f.entiteId.value
  
    this.department.departmentName = this.f.depName.value;
    this.department.entite=this.entite ;
    this.department.departmentUrl = this.f.depUrl.value;
    this.department.departmentTitre = this.f.depTitre.value;


    this.departmentService.save(this.department).subscribe(
      response => {
        this.Handler(response)
        console.log(response)
        console.log("response")
      }
    );

  }

  Handler(response) {

    console.log("Responce : " + response);

    this.snackBar.open("New department Added", "Close", {
      duration: 2000, verticalPosition: 'top', panelClass: ['green-snackbar']
    });

    // this.router.navigate(['/add-dep']);
    // this.reloadPage();
  }

  handle(resp) {
    console.log("department list refreshed");

  }

  onClickCancel() {


    this.router.navigate(['/departments']);


  }
  reloadPage(): void {
    window.location.reload();
  }
}

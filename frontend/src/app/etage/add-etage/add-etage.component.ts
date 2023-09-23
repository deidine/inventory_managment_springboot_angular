import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Component, OnInit, ErrorHandler } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { EtageService } from '../../services/etage.service';

import { UserProfile } from 'src/app/models/UserModels';
import { LoginCheckService } from 'src/app/login/services/login-check.service';
import { Entite } from 'src/app/Entite/Entite';
import { EntiteService } from 'src/app/Entite/services/entite.service';
import { Etage } from 'src/app/models/Etage';

@Component({
  selector: 'add-product',
  templateUrl: './add-etage.component.html',
  styleUrls: ['./add-etage.component.css']
})
export class AddetageComponent implements OnInit {

  public etage: Etage = new Etage();
  entiteList:any;

  public userName = localStorage.getItem("currentUserName");
  deidine: any;
  public myProfile: UserProfile;
 
  entite:Entite=new Entite();
   constructor(private fb: FormBuilder,
    private router: Router,private entiteService: EntiteService,
    private userProfileService: LoginCheckService,
    private EtageService: EtageService,
    private snackBar: MatSnackBar) { }
    
    ngOnInit() {
    
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
    numero: ['', [Validators.required]]
  });

  get f() { return this.addProductForm.controls; }

  onSubmit() {
  
    this.etage.numero=this.f.numero.value;

    this.EtageService.save(this.etage).subscribe(
      response => {
        this.Handler(response)
        console.log(response)
        console.log("response")
      }
    );

  }

  Handler(response) {

    console.log("Responce : " + response);

    this.snackBar.open("New Etage Added", "Close", {
      duration: 2000, verticalPosition: 'top', panelClass: ['green-snackbar']
    });

    // this.router.navigate(['/add-Etage']);
    // this.reloadPage();
  }

  handle(resp) {
    console.log("Etage list refreshed");

  }

  onClickCancel() {


    this.router.navigate(['/Etage']);


  }
  reloadPage(): void {
    window.location.reload();
  }
}

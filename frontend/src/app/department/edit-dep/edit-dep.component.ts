 import { Departement } from '../../models/department';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ErrorHandler } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DepartementService } from '../../services/department.service';

import { UserProfile } from 'src/app/models/UserModels';
import { LoginCheckService } from 'src/app/login/services/login-check.service';
import { EntiteService } from 'src/app/Entite/services/entite.service';

@Component({
  selector: 'edit-product',
  templateUrl: './edit-dep.component.html',
  styleUrls: ['./edit-dep.component.css']
})
export class EditDepComponent implements OnInit {

  public department: Departement = new Departement();
  entiteList:any;

  public userName = localStorage.getItem("currentUserName");
  id: number;

  public myProfile: UserProfile;

  constructor(private fb: FormBuilder,
    private router: Router, private route: ActivatedRoute,
private entiteService: EntiteService,
    private userProfileService: LoginCheckService,
    private departmentService: DepartementService,
    private snackBar: MatSnackBar) { }

  ngOnInit() { 
      this.entiteService.getAllEntites().subscribe(data => {
        this.entiteList = data;
        
      });
 
    // this.id = this.route.snapshot.params['departmentId'];
this.id=this.route.queryParams['getValue']()['departmentId']
    this.departmentService.getDepartmentById(this.id).subscribe(
      resp => {
        //this.handle(response)
        this.department.departmentName = resp.departmentName;
        this.department.departmentId = resp.departmentId;
        this.department.entite = resp.entite;
        this.department.departmentTitre= resp.departmentTitre;
        this.department.departmentUrl = resp.departmentUrl;
      }
    );
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
  public costRegex: RegExp = /^[0-9]*$/;
  
  updateDepForm : FormGroup = this.fb.group({
    departmentUrl: ['',[Validators.required,Validators.pattern(this.stringRegex)]],
    departmentName : ['',[Validators.required,Validators.pattern(this.stringRegex)]],
    entiteName : ['',[Validators.required ]],
    departmentTitre : ['',[Validators.required,Validators.pattern(this.stringRegex)]] 
  });
  
  get f() { return this.updateDepForm.controls; }
  
  onSubmit() {
    // this.department.entite.entiteName=this.f.entiteName.value
    alert(this.f.entiteName.value)
    this.departmentService.updateDepartement(this.department,this.id).subscribe(
      asd=>{
        // this.router.navigateByUrl('department')
        alert(this.department.entite.entiteName)
  }
    ,err=> alert(err+"error")
    );
    console.log(this.department.departmentId)
    this.snackBar.open("Product Updated", "Close", {
      duration: 2000,verticalPosition: 'top',panelClass: ['green-snackbar']
    });
    
   
  }

 
  
  
  onClickCancel() {
    this.router.navigate(['/departments']);
  }
  reloadPage(): void {
    window.location.reload();
  }
  

}

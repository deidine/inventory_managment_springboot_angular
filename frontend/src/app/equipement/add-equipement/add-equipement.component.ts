 
import { Equipement } from '../equipement';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Component, OnInit, ErrorHandler } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { EquipementService } from '../equipement.service';
import { UserProfile } from 'src/app/models/UserModels';
import { LoginCheckService } from 'src/app/login/services/login-check.service'; 
import { Buro } from 'src/app/models/buro';
import { EntiteService } from 'src/app/Entite/services/entite.service';
import { BuroService } from 'src/app/services/buro.service';

@Component({
  selector: 'add-equipement',
  templateUrl: './add-equipement.component.html',
  styleUrls: ['./add-equipement.component.css']
})
export class AddEquipementComponent implements OnInit {

buro : Buro=new Buro(); 
buroList:any;
  public equipement : Equipement =  new Equipement();
 
  public userName = localStorage.getItem("currentUserName");
 
  public myProfile : UserProfile;
  
  constructor(private fb: FormBuilder ,
    private router :Router, private buroService: BuroService ,
    private userProfileService : LoginCheckService,
    private EquipementService : EquipementService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    
       this.buroService.getBuros().subscribe(data => {
        this.buroList = data;
        
        console.log(this.buroList.id+"deidineiidienidn")
      });
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
    this.myProfile = response;
    this.userName = this.myProfile.username;
  }

  onClickProfile(){
    
    this.router.navigate(['/my_profile']);

  }

  onClickLogout(){
    console.log("Logout Clicked");
    
      console.log("cleared User Id "+localStorage.getItem("currentUserId") );
      localStorage.clear();

      this.snackBar.open("User Logged Out", "Close", {
        duration: 5000,verticalPosition: 'top',panelClass: ['green-snackbar']
      });
      
      this.router.navigate(['']);
    
  }

  public stringRegex : RegExp =  /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/ ;
  public costRegex : RegExp = /^[0-9]*$/ ;
  

  addEquipementForm : FormGroup = this.fb.group({
    antivirus_active : ['',[Validators.required,Validators.pattern(this.stringRegex)]],
    etat : ['',[Validators.required,Validators.pattern(this.stringRegex)]],
    anne_aquisition : ['',[Validators.required,Validators.pattern(this.stringRegex)]],
    reference : ['',[Validators.required,Validators.pattern(this.stringRegex)]],
    type : ['',[Validators.required,Validators.pattern(this.stringRegex)]],
    systeme_active : ['',[Validators.required,Validators.pattern(this.stringRegex)]],
    buro_numero : ['',[Validators.required]],
    modele : ['',[Validators.required,Validators.pattern(this.stringRegex)]],
    SiOrdinateur : ['',[Validators.required,Validators.pattern(this.stringRegex)]],
    vendeur : ['',[Validators.required,Validators.pattern(this.stringRegex)]],
 });

  get f() { return this.addEquipementForm.controls; }

  onSubmit(){

    this.buro.id=this.f.buro_numero.value
    this.equipement.antivirus_active = this.f.antivirus_active.value;
    this.equipement.buro = this.buro;
    this.equipement.etat = this.f.etat.value;
    this.equipement.modele = this.f.modele.value; 
    this.equipement.siOrdinateur  = this.f.SiOrdinateur.value;
    this.equipement.reference = this.f.reference.value;
    this.equipement.systeme_active = this.f.systeme_active.value;
    this.equipement.vendeur = this.f.vendeur.value;
    this.equipement.anne_aquisition = this.f.anne_aquisition.value;
    this.equipement.type = this.f.type.value;
    console.log(this.equipement+"deiinen") 
    // console.log(this.f.prodName.value);

    // console.log(this.f.prodCost.value);
    // console.log(this.f.prodStatus.value);

    this.EquipementService.save(this.equipement).subscribe(
      response => this.Handler(response)
    );

  }

  Handler(response){

    console.log("Responce : " + response);

    this.snackBar.open("New Equipement Added", "Close", {
      duration: 2000,verticalPosition: 'top',panelClass: ['green-snackbar']
    });

    this.router.navigate(['/Equipements']);
    
  }

  handle(resp){
    console.log("Equipement list refreshed");

  }

  onClickCancel(){

    
      this.router.navigate(['/Equipements']);  
    
  
  }

}

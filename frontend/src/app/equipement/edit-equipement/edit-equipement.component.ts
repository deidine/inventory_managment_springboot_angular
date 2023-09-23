
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { UserProfile } from 'src/app/models/UserModels';
import { Router, ActivatedRoute } from '@angular/router';
import { EquipementService } from '../equipement.service';
import { Equipement } from '../equipement';
import { MatSnackBar,} from '@angular/material';

@Component({
  selector: 'edit-equipement',
  templateUrl: './edit-equipement.component.html',
  styleUrls: ['./edit-equipement.component.css']
})
export class EditEquipementComponent implements OnInit {

  displayedColumns: string[] = ['EquipementId','EquipementName', 'EquipementCost', 'EquipementStatus'];

  public userName = localStorage.getItem("currentUserName");
  public myProfile : UserProfile;
get_id;
  equipements: Equipement[] ;
  equipement: Equipement =new Equipement() ;
  
  constructor(private router :Router, 
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private snackBar: MatSnackBar,
              private equipementService: EquipementService) { }

  ngOnInit() {
   this.get_id= this.route.queryParams['getValue']()['equipementId']
    this.equipementService.getEquipementById(this.get_id).subscribe(
      response => { 
      this.equipement.antivirus_active = response.antivirus_active;
      this.equipement.buro = response.buro;
      this.equipement.etat = response.etat;
      this.equipement.modele = response.modele;
      this.equipement.siOrdinateur  = response.siOrdinateur;
      this.equipement.reference = response.reference;
       this.equipement.systeme_active = response.systeme_active;
      this.equipement.vendeur = response.vendeur;
      this.equipement.anne_aquisition = response.anne_aquisition;
      this.equipement.type = response.type;
      }
      
      );
  }

  handle(response)
  {

  }

  onClickUpdateEquipement()
  {
    this.equipementService.updateEquipement(this.get_id,this.equipement).subscribe(
      response => this.EquipementResponse(),
      error => console.error("Equipement not Updated")
    );
  }

  EquipementResponse()
  {
    console.log("Equipement Details Updated Successfully");


    this.snackBar.open("Equipement Updated", "Close", {
      duration: 5000,verticalPosition: 'top',panelClass: ['green-snackbar']
    });

    this.router.navigate(['/equipement']);
  }
  
  onSubmit(){
    console.log(" Inside Equipement Details Update");

    this.snackBar.open("Equipement Updated", "Close", {
      duration: 2000,verticalPosition: 'top',panelClass: ['green-snackbar']
    });
    
    this.equipementService.updateEquipement(this.get_id,this.equipement).subscribe(asd=>this.router.navigateByUrl('Equipements'));
  }

  onClickProfile(){
    
    this.router.navigate(['/my_profile']);

  }

  onClickLogout(){
    console.log("Logout Clicked");
    
 

      // console.log("cleared User Id "+localStorage.getItem("currentUserId") );
      // localStorage.clear();

      // this.snackBar.open("User Logged Out", "Close", {
      //   duration: 2000,verticalPosition: 'top',panelClass: ['green-snackbar']
      // });
      
      // this.router.navigate(['']);
    
  }

  onClickCancel(){
    this.router.navigate(['/admin']);
  }

  editEquipementForm : FormGroup = this.fb.group({
    siOrdinateur : ['',[Validators.required]],
reference: ['',[Validators.required]],
vendeur : ['',[Validators.required]],
    antivirus_active : ['',[Validators.required]],
  });



}

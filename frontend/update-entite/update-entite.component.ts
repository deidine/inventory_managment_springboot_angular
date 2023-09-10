import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Entite } from '../Entite';
import { EntiteService } from '../services/entite.service';
import { SharedServiceService } from '../services/shared-service.service';
import { SuccessfulDialogComponent } from '../successful-dialog/successful-dialog.component';
import { UnSuccessfulDialogComponent } from '../un-successful-dialog/un-successful-dialog.component';

@Component({
  selector: 'app-update-entite',
  templateUrl: './update-entite.component.html',
  styleUrls: ['./update-entite.component.css']
})
export class UpdateEntiteComponent implements OnInit {

  entite:Entite  = new Entite();
   
  successMessage:string ="";
  errMessage: string ="";

  constructor(private entiteService: EntiteService, private dialog:MatDialog, private sharedServices:SharedServiceService) { 
  }

  ngOnInit(): void {

    this.entite=this.sharedServices.getEntite();
  }

  
  updateentiteForm=new FormGroup({
    entitename:new FormControl('',[Validators.required]),
    units: new FormControl('',[Validators.required]),
    category: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required]),
  })

  get entitename(){
    return this.updateentiteForm.get('entitename');
  }

  get units(){
    return this.updateentiteForm.get('units');
  }

  get category(){
    return this.updateentiteForm.get('category');
  }

  get description(){
    return this.updateentiteForm.get('description');
  }

  updateentite(){

    this.entite.entiteName=this.entitename.value;
    this.entite.units=this.units.value;
    this.entite.entiteCategory=this.category.value;
    this.entite.entiteDescription=this.description.value;

    

    if(this.entite.entiteId=="")
    {
      this.errMessage="entite could not be Added to the catalog : entite Id is required";
    }
    else if(this.entite.entiteName=="")
    {
      this.errMessage="entite could not be Added to the catalog : entite Name is required";
    }
    else if(this.entite.entiteCategory=="")
    {
      this.errMessage="entite could not be Added to the catalog : entite Category is required";
    }
    else if(this.entite.units==0 || this.entite.units==null)
    {
      this.errMessage="entite could not be Added to the catalog : entite Units can not be 0";
    }
    else if(this.entite.entiteDescription=="")
    {
      this.errMessage="entite could not be Added to the catalog : entite Description is required";
    }
    else{
      this.entiteService.updateEntite(this.entite, this.entite.entiteId).subscribe(data => {

        if(data)
        {
          this.openSuccessfulDialog();
        }
        else{
          this.openunSuccessfulDialog();
        }
        
      });

    }

  }
   
  openSuccessfulDialog() {
    this.sharedServices.setdialogtitle("Successfull");
    this.sharedServices.setdialogcontent("entite Updated Successfully !!");
    this.dialog.open(SuccessfulDialogComponent);
  }

  openunSuccessfulDialog() {
    this.sharedServices.setdialogtitle("Unsuccessfull");
    this.sharedServices.setdialogcontent("entite could not be Updated !!");
    this.dialog.open(UnSuccessfulDialogComponent);
  }

}

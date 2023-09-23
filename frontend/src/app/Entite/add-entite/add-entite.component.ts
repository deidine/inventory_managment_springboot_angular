import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Entite } from '../Entite';
import { EntiteService  } from '../services/entite.service';
import { SharedServiceService } from '../services/shared-service.service';

@Component({
  selector: 'app-add-entite',
  templateUrl: './add-entite.component.html',
  styleUrls: ['./add-entite.component.css']
})
export class AddEntiteComponent implements OnInit {

  entite: Entite = new Entite();
  wilayats:any;
  mougats:any;
  successMessage:string ="";
  errMessage: string ="";

  constructor(private entiteService:EntiteService, private sharedServiceService:SharedServiceService) { 

  }


  ngOnInit(): void {
    this.entiteService.getWillayat().subscribe(data => {
      this.wilayats=data
      console.log(this.wilayats)
     })

     this.entiteService.getMougatta().subscribe(data2 => {
      this.mougats=data2
      console.log(this.mougats)
     })
  }

  addentiteForm=new FormGroup({
    
    entitename:new FormControl('',[Validators.required]),
    type:new FormControl('-select type d\'entite-',[Validators.required]),
    mougattaa: new FormControl('',[Validators.required]),
    wilayas: new FormControl('',[Validators.required]),
    affectation: new FormControl('',[Validators.required]),
  })

   
  get entitename(){
    return this.addentiteForm.get('entitename');
  }

  get mougattaa(){
    return this.addentiteForm.get('mougattaa');
  }

  get wilayas(){
    return this.addentiteForm.get('wilayas');
  }

  get affectation(){
    return this.addentiteForm.get('affectation');
  }
  get type(){
    return this.addentiteForm.get('type');
  }

  addentite(){

    this.entite.entiteName=this.entitename.value;
    this.entite.mougattaa=this.mougattaa.value;
    this.entite.wilayas=this.wilayas.value;
    this.entite.type=this.type.value;
    this.entite.affectation=this.affectation.value;

    console.log(this.entite);


      this.entiteService.addEntite(this.entite).subscribe(data => {
       
        if(data)
        {
            this.errMessage="";
            this.successMessage="entite successfully added to the catalog";
        }
        else{
          this.successMessage="";
          this.errMessage="entite could not be Added to the catalog : Check Specification of your entite";
        }
  
      })

    }

   
  }



import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EntiteService } from '../services/entite.service';

@Component({
  selector: 'app-get-entite-by-category',
  templateUrl: './get-entite-by-category.component.html',
  styleUrls: ['./get-entite-by-category.component.css']
})
export class GetentiteByCategoryComponent implements OnInit {

  entiteList:any;
  entite:any;
  key:any="";
  headers = ["Id", "entite Name", "entite Description", "Category", "Units"];


  constructor(private entiteService: EntiteService) { }


  ngOnInit(): void {
    
  }

  
  categoryForm=new FormGroup({
    
    category: new FormControl('',[Validators.required])
  })

  get category(){
    return this.categoryForm.get('category');
  }

  getentiteByCategory(){

    this.key=this.categoryForm.value;

    this.entiteService.getAllEntitesByCategory(this.key).subscribe(data => {
      this.entiteList = data;
    });

  }


}

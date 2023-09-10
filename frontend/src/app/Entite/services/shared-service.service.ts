import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  getEntite(): import("../Entite").Entite {
    throw new Error('Method not implemented.');
  }

  title:string="";
  content:string="";
  entite:any;

  constructor() { }

  setdialogtitle(title:string){
    this.title=title;
  }

  setdialogcontent(content:string){
    this.content=content;

  }

  getdialogtitle(){
    return this.title;
  }
  getdialogcontent(){
    return this.content;

  }

  setEntite(entite:any){
      this.entite=entite;
  }

  // getEntite(){
  //   return this.entite;
  // }
}

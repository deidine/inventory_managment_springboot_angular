import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Equipement } from './equipement';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EquipementService {

  constructor(private httpClient:HttpClient) { }
    
  getEquipements(){
    return this.httpClient.get<Equipement[]>(`${environment.apiURL}/equipement/find-all`,{
      headers:new HttpHeaders(
        {
          'Authorization' : `Bearer ${localStorage.getItem('UserToken')}`
        }
      )
    }
   );
  }
  
  getEquipementById(EquipementId){
    return this.httpClient.get<Equipement>(`${environment.apiURL}/equipement/read/`+EquipementId,{
      headers:new HttpHeaders(
        {
          'Authorization' : `Bearer ${localStorage.getItem('UserToken')}`
        }
      )
    }
   );
  }
  
  public save(equipement: Equipement){
     console.log(equipement)
    //  console.log(equipement.id_buro)
      console.log(equipement.siOrdinateur)
      console.log("deidine tir mchnk")
    return this.httpClient.post<Equipement>(`${environment.apiURL}/equipement/save`,equipement,{
    
      headers:new HttpHeaders(
        {
          'Authorization' : `Bearer ${localStorage.getItem('UserToken')}`
        }
      )
    }
   );
  }
  
  public updateEquipement (id:number,equipement:Equipement){
  
    return this.httpClient.put<Equipement>(`${environment.apiURL}/equipement/update/${id}`, equipement,{
      headers:new HttpHeaders(
        {
          'Authorization' : `Bearer ${localStorage.getItem('UserToken')}`
        }
      )
    }
   );
  }
}
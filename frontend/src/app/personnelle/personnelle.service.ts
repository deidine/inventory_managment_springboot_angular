import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Personnelle } from '../models/UserModels';
 
@Injectable({
  providedIn: 'root'
})
export class PersonnelleService {

  constructor(private httpClient: HttpClient) { }

  registerPersonnelle(newPersonnelle:any) {
    console.log("Call to backend method to register new user");
    return this.httpClient.post<Personnelle>('http://localhost:8080/api/personnelle/save', newPersonnelle);
  }
}
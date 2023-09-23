import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Personnelle } from './Personnelle';
import { environment } from 'src/environments/environment';
 
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' ,
  "Authorization" : `Bearer ${localStorage.getItem("UserToken")}`
})
};
  
@Injectable({
  providedIn: 'root'
})
export class PersonnelleService {

constructor(private httpClient:HttpClient) { }
  getPersonnelles(){
     return this.httpClient.get<any>(`${environment.apiURL}/personnelle/find-all`,httpOptions);
  }

  public save(personnelle:Personnelle){
    return this.httpClient.post<Personnelle>(`${environment.apiURL}/personnelle/save`,personnelle,
    httpOptions);
  }

  deletePersonnelle(id: number): Observable<Object>{
    return this.httpClient.delete(`${environment.apiURL}/personnelle/delete/${id}`,  httpOptions);
  }
  public updatePersonnelle (personnelle:Personnelle,id:number ){ 
    return this.httpClient.put<Personnelle>(`${environment.apiURL}/personnelle/update/${id}`, personnelle,    httpOptions);
  }

  getPersonnelleById(personnelleId){
    return this.httpClient.get<Personnelle>(`${environment.apiURL}/personnelle/`+personnelleId,    httpOptions);
  }
}
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Etage } from '../models/Etage';
import { environment } from 'src/environments/environment';
 
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' ,
  "Authorization" : `Bearer ${localStorage.getItem("UserToken")}`
})
};
  
@Injectable({
  providedIn: 'root'
})
export class EtageService {

constructor(private httpClient:HttpClient) { }
  getEtages(){
     return this.httpClient.get<Etage[]>(`${environment.apiURL}/etage/find-all`,httpOptions);
  }

  public save(etage:Etage){
    return this.httpClient.post<Etage>(`${environment.apiURL}/etage/save`,etage,
    httpOptions);
  }

  deleteEtage(id: number): Observable<Object>{
    return this.httpClient.delete(`${environment.apiURL}/etage/delete/${id}`,  httpOptions);
  }
  public updateEtage (Etage:Etage,id:number ){ 
    return this.httpClient.put<Etage>(`${environment.apiURL}/etage/update/${id}`, Etage,    httpOptions);
  }

  getEtageById(etageId){
    return this.httpClient.get<Etage>(`${environment.apiURL}/etage/read/`+etageId,    httpOptions);
  }
}
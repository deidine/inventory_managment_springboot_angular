import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Departement } from '../models/department';
import { environment } from 'src/environments/environment';
 
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' ,
  "Authorization" : `Bearer ${localStorage.getItem("UserToken")}`
})
};
  
@Injectable({
  providedIn: 'root'
})
export class DepartementService {

constructor(private httpClient:HttpClient) { }
  getDepartements(){
     return this.httpClient.get<Departement[]>(`${environment.apiURL}/department/find-all`,httpOptions);
  }

  public save(Departement:Departement){
    return this.httpClient.post<Departement>(`${environment.apiURL}/department/save`,Departement,
    httpOptions);
  }

  deleteDepartment(id: number): Observable<Object>{
    return this.httpClient.delete(`${environment.apiURL}/department/delete/${id}`,  httpOptions);
  }
  public updateDepartement (departement:Departement,id:number ){ 
    return this.httpClient.put<Departement>(`${environment.apiURL}/department/update/${id}`, departement,    httpOptions);
  }

  getDepartmentById(departmentId){
    return this.httpClient.get<Departement>(`${environment.apiURL}/department/read/`+departmentId,    httpOptions);
  }
}
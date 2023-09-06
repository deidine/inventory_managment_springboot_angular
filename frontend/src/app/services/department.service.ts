import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Departement } from '../models/department';

@Injectable({
  providedIn: 'root'
})
export class DepartementService {

constructor(private httpClient:HttpClient) { }

  getDepartements(){
     return this.httpClient.get<Departement[]>("http://localhost:8080/api/department/find-all");
  }

  public save(Departement:Departement){
    return this.httpClient.post<Departement>("http://localhost:8080/api/department/save",Departement);
  }

  deleteDepartment(id: number): Observable<Object>{
    return this.httpClient.delete(`http://localhost:8080/api/department/delete/${id}`);
  }
  public updateDepartement (departement:Departement,id:number ){ 
    return this.httpClient.put<Departement>(`http://localhost:8080/api/department/update/${id}`, departement);
  }

  getDepartmentById(departmentId){
    return this.httpClient.get<Departement>("http://localhost:8080/api/department/read/"+departmentId);
  }
}
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Buro } from '../models/buro';
import { environment } from 'src/environments/environment';
 
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' ,
  "Authorization" : `Bearer ${localStorage.getItem("UserToken")}`
})
};
  
@Injectable({
  providedIn: 'root'
})
export class BuroService {

constructor(private httpClient:HttpClient) { }
  getBuros(){
     return this.httpClient.get<Buro[]>(`${environment.apiURL}/buro/find-all`,httpOptions);
  }

  public save(Buro:Buro){
    return this.httpClient.post<Buro>(`${environment.apiURL}/buro/save`,Buro,
    httpOptions);
  }

  deleteburo(id: number): Observable<Object>{
    return this.httpClient.delete(`${environment.apiURL}/buro/delete/${id}`,  httpOptions);
  }
  public updateBuro (Buro:Buro,id:number ){ 
    return this.httpClient.put<Buro>(`${environment.apiURL}/buro/update/${id}`, Buro,    httpOptions);
  }

  getburoById(buroId){
    return this.httpClient.get<Buro>(`${environment.apiURL}/buro/read/`+buroId,    httpOptions);
  }
}
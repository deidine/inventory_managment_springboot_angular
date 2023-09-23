import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Entite } from '../Entite';
import { SharedServiceService } from './shared-service.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EntiteService {

  constructor(private httpClient: HttpClient, private sharedServiceService:SharedServiceService) { }

UserToken
  getAllEntites(): Observable<any> {
    
    return this.httpClient.get<any>(`${environment.apiURL}/entite/find-all`
    ,{
      headers:new HttpHeaders(
        {
          'Authorization' : `Bearer ${localStorage.getItem('UserToken')}`
        }
      )
    }
    );
  }

  addEntite(entite:Entite): Observable<any>{
    return this.httpClient.post<Entite>(`${environment.apiURL}/entite/save`,entite
    ,{
      headers:new HttpHeaders(
        {
          // 'Authorization' : `Bearer ${localStorage.getItem('UserToken')}`
  "Authorization" : `Bearer ${localStorage.getItem("UserToken")}`
        
        }
      )
    }
    );
  }

  getAllEntitesByCategory(category: any): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiURL}/entite/getEntitesByCategory/${category['category']}`,{
      headers:new HttpHeaders(
        {
          'Authorization' : `Bearer ${localStorage.getItem('UserToken')}`
        }
      )
    });
  }
  
  getWillayat(): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiURL}/entite/cities`,{
      headers:new HttpHeaders(
        {
          'Authorization' : `Bearer ${localStorage.getItem('UserToken')}`
        }
      )
    });
  }  getMougatta(): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiURL}/entite/mougatta`,{
      headers:new HttpHeaders(
        {
          'Authorization' : `Bearer ${localStorage.getItem('UserToken')}`
        }
      )
    });
  }

  deleteEntite(EntiteId: any): Observable<any> {
    return this.httpClient.delete<any>(`${environment.apiURL}/entite/delete/${EntiteId}`,{
      headers:new HttpHeaders(
        {
          'Authorization' : `Bearer ${localStorage.getItem('UserToken')}`
        }
      )
    });
  }

  updateEntite(entite:Entite,entiteId: any): Observable<any>{
    return this.httpClient.post<any>(`${environment.apiURL}/entite/updateEntite/${entiteId}`,entite,{
      headers:new HttpHeaders(
        {
          'Authorization' : `Bearer ${localStorage.getItem('UserToken')}`
        }
      )
    });
  }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../models/user';
import { UserProfile } from '../models/UserModels';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }

  getDistributors(){
    return this.httpClient.get<User[]>("http://172.29.57.61:8080/user/distributor");
  }

  getRetailers(distributorId: any){
    let params = new HttpParams();
    params = params.append('id', distributorId);
    return this.httpClient.get<User[]>("http://172.29.57.61:8080/user/retailers",{params:params});
  }

  public save(user: User){
    return this.httpClient.post<User>("http://172.29.57.61:8080/user/adduser",user);
  }

  updateMyProfile(user:any){

    let uId=localStorage.getItem("currentUserId");

    let url = "http://172.29.57.61:8080/user/"+uId;

    return this.httpClient.put<UserProfile>(url,user);
  }

  updatePassword(passwordUpdator)
  {
    let uId=localStorage.getItem("currentUserId");

    let url = "http://172.29.57.61:8080/user/updatepassword";

    return this.httpClient.post<any>('http://172.29.57.61:8080/user/updatepassword',passwordUpdator);
  }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { stringify } from '@angular/compiler/src/util';
import { Observable } from 'rxjs';
import { UserProfile } from 'src/app/models/UserModels';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})

export class LoginCheckService {

  constructor(private httpClient: HttpClient) { }
  pwd: any;
  usn: any;

  login(username: string, password: string): Observable<any> {
    console.log("Call to backend method to check userEmail and password " + username);

    return this.httpClient.post<LoginInfo>('http://localhost:8080/users/signin',
      {
        username,
        password
      }, httpOptions);
  }

 
  register(username: string, password: string, email: string,appUserRoles:string[]): Observable<any> {
    console.log("Call to backend method to check userEmail and password " + username);
alert(appUserRoles)
    return this.httpClient.post<RrgisterInfo>('http://localhost:8080/users/signup',
      {
        username,
        password,
         email,appUserRoles
      }, httpOptions);
  }
  
  getUserDetails(userId)
  {
    let id : number = parseInt(userId);
    console.log("Call to backend method to get current user Details with id "+id );
    
    let param = new HttpParams();
    param = param.set('userId',userId);

    let url = "http://localhost:8080/users/users/"+userId;

    return this.httpClient.get<UserProfile>(url);
  }


}

 


export class UserInfo {


  public userId: number;
  public userName: string;
  public roleType: number;
  public result: boolean


}
export class UserInfoReg {


  public username: string;
  public appUserRoles: any;
  public password: string


}
export class LoginInfo {
  username: string;
  password: string;
  // userType='';
  // usernameErrorMessage='';
  // passwordErrorMessage='';

}
export class RrgisterInfo {
  username: string;
  password: string;
  email: string;
  appUserRoles:string[];
}
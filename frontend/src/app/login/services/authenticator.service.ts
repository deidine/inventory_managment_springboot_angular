import { Injectable } from '@angular/core';
import { UserInfo } from './login-check.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatorService {

  constructor(private router : Router) { }

  user : UserInfo;

  isUserLoggedIn() {
    let user = localStorage.getItem('currentUserId')
    console.log(!(user === null))
    return !(user === null)
  }

  public checkLogin(){
    let result = localStorage.getItem("currentUserResult");

    if(result === null)
    {
      this.router.navigate(['']);
    }

    else
    {
      let role = localStorage.getItem("currentUserRole")

      if(role === '1'){
        this.router.navigate(['admin']);
      }

      if(role === '2'){
        this.router.navigate(['distributor']);
      }

      if(role === '3'){
        this.router.navigate(['retailer']);
      }
    }
    
  }
 


}
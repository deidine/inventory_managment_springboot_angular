import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private router : Router) { }

  public logoutInitiator(){

    console.log("Logging out current user");

    //localStorage.removeItem("currentUser");
    console.log("cleared User Id "+localStorage.getItem("currentUserId") );
    localStorage.clear();

    this.router.navigate(['']);
    
  }
}

import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { AuthenticatorService } from '../login/services/authenticator.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate{
  
  constructor(private router: Router,
              private authService: AuthenticatorService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isUserLoggedIn() )
      {
         return true;
      }

    this.router.navigate(['']);
    return false;

  }
 


}


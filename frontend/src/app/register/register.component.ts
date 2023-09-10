import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms'; 
import { TokenStorageService } from '../login/services/token-storage.service';

import { LoginCheckService, UserInfoReg, RrgisterInfo } from '../login/services/login-check.service';
import { AuthenticatorService } from '../login/services/authenticator.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  //  loginDetails = new LoginDetails('','');


  loading = false;
  submitted = false;
  returnUrl: string;
  // public usernameregex: RegExp = [a-zA-Z]*$;
  // public usernameregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  loginFormError = false;

  registerInfo: RrgisterInfo = new RrgisterInfo();
  user: UserInfoReg = new UserInfoReg();

  roles: string[] = [];


  constructor(private fb: FormBuilder,
    private router: Router,
    private loginService: LoginCheckService,
    private authenticateService: AuthenticatorService,
    private snackBar: MatSnackBar, private tokenStorage: TokenStorageService
  ) { }
  isLoggedIn = false;
  userStorage: any;

  isLoginFailed = false;
  ngOnInit() {

    // this.authenticateService.checkLogin();
    // if (this.tokenStorage.getToken()) {
    //   this.isLoggedIn = true;
    //   this.roles = this.tokenStorage.getUser().roles;
    // }
  }
  public emailregex: RegExp = /[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,5}/;
 public stringRegex : RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
 ;
 public costRegex: RegExp = /^[0-9]*$/;
  
  loginForm: FormGroup = this.fb.group({
    ipusername: ['', [Validators.required], Validators.pattern(this.stringRegex)],
    ipemail: ['', [Validators.required], Validators.pattern(this.emailregex)],
    // ipusername: ['',[Validators.required,Validators.pattern(this.usernameregex)]],
    ipPassword: ['', [Validators.required, Validators.minLength(5)]]

  });

  get f() { return this.loginForm.controls; }

  handleSuccessfulResponse(response) {
    this.user = response;
    this.user = response;
     this.userStorage = this.tokenStorage.getUser()
    localStorage.setItem("currentUserId", JSON.stringify(this.userStorage.id));
    localStorage.setItem("currentUserEmail", JSON.stringify(this.userStorage.email));
    localStorage.setItem("currentUserRole", JSON.stringify(this.userStorage.roles));
    localStorage.setItem("currentUserName", (this.userStorage.username));
    localStorage.setItem("UserToken", (this.tokenStorage.getToken()));

        this.router.navigate(['/login']);
      }
 
      role:any;

  

  validateSubmit() {
    console.log("Inside validate Login method");
    this.registerInfo.username = this.f.ipusername.value;
    this.registerInfo.email = this.f.ipemail.value;
    this.registerInfo.password = this.f.ipPassword.value;

    this.registerInfo.appUserRoles=["ROLE_CLIENT"];
    this.loginService.register(this.registerInfo.username,  this.registerInfo.password,this.registerInfo.email,this.registerInfo.appUserRoles).subscribe(
      response => {
        this.handleSuccessfulResponse(response),
        //   this.tokenStorage.saveToken(response.accessToken);

        this.tokenStorage.saveUser(response);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        // this.reloadPage();
      },
      err => {
        // this.handleSuccessfulResponse(err)
        
        alert("error")
        // this.reloadPage();
      }
    );
  }
  reloadPage(): void {
    window.location.reload();
  }
  onSubmit() {

    this.validateSubmit();
  }

}



import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from './_services/auth.service';
import { TokenStorageService } from './_services/token-storage.service';

import { LoginCheckService, UserInfo, LoginInfo } from './services/login-check.service';
import { AuthenticatorService } from './services/authenticator.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  //  loginDetails = new LoginDetails('','');


  loading = false;
  submitted = false;
  returnUrl: string;
  // public usernameregex: RegExp = [a-zA-Z]*$;
  // public usernameregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  loginFormError = false;

  loginInfo: LoginInfo = new LoginInfo();
  user: UserInfo = new UserInfo();
  userStorage: any;
  roles: string[] = [];


  constructor(private fb: FormBuilder,
    private router: Router,
    private loginService: LoginCheckService,
    private authenticateService: AuthenticatorService,
    private snackBar: MatSnackBar, private tokenStorage: TokenStorageService
  ) { }
  isLoggedIn = false;
  isLoginFailed = false;

  ngOnInit() {

    this.authenticateService.checkLogin();
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  loginForm: FormGroup = this.fb.group({
    ipusername: ['', [Validators.required]],
    // ipusername: ['',[Validators.required,Validators.pattern(this.usernameregex)]],
    ipPassword: ['', [Validators.required, Validators.minLength(5)]]

  });

  get f() { return this.loginForm.controls; }

  handleSuccessfulResponse(response) {
    this.user = response;
    console.log("Inside response handler with response " + this.user.result);
    this.userStorage = this.tokenStorage.getUser()
    localStorage.setItem("currentUserId", JSON.stringify(this.userStorage.id));
    localStorage.setItem("currentUserEmail", JSON.stringify(this.userStorage.email));
    localStorage.setItem("currentUserRole", JSON.stringify(this.userStorage.roles));
    localStorage.setItem("currentUserName", (this.userStorage.username));
    localStorage.setItem("UserToken", (this.tokenStorage.getToken()));
  }

  validateSubmit() {
    console.log("Inside validate Login method");
    this.loginInfo.username = this.f.ipusername.value;
    this.loginInfo.password = this.f.ipPassword.value;


    this.loginService.login(this.loginInfo.username, this.loginInfo.password).subscribe(
      response => {
        this.tokenStorage.saveToken(response.accessToken);
        
        this.tokenStorage.saveUser(response);
        this.handleSuccessfulResponse(response)
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.reloadPage();
      },
      err => {
        this.handleSuccessfulResponse(err)

        // this.reloadPage();
      }
    );
  }
  reloadPage(): void {
    window.location.reload();
  }
  onSubmit() {

    this.validateSubmit();

    if (this.user.result === false) {
      this.loginFormError = true;
    }

  }

}



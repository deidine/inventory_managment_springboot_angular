import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public userName ;

  logoutClick=false;

  constructor(private router : Router,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.userName = localStorage.getItem("currentUserName");
  }

  onClickProfile(){
    
    this.router.navigate(['/my_profile']);

  }

  animal: string;
  name: string;

  onClickLogout(){
    console.log("Logout Clicked");
    
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '30%',
      
    });


  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    private snackBar: MatSnackBar,
    private router : Router,

    ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onLogoutClick()
  {
    this.dialogRef.close();

    console.log("cleared User Id "+localStorage.getItem("currentUserId") );
    localStorage.clear();

    this.snackBar.open("User Logged Out", "Close", {
      duration: 2000,verticalPosition: 'top',panelClass: ['green-snackbar']
    });

    this.router.navigate(['']);
  

  }

}
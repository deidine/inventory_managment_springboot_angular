import { Component, OnInit, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { MatSidenav, MatSnackBar, MatIconModule, MatButtonModule, MatSidenavModule, MatToolbarModule } from '@angular/material';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { IUnsplashResponse } from './IUnsplashResponse';
import { ImageService } from './image.service';
import { delay } from "rxjs/operators";
import { BreakpointObserver } from '@angular/cdk/layout';
@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  // @ViewChild(MatSidenav);
  sidenav!: MatSidenav;
  imageData$: Observable<IUnsplashResponse> = new Observable();


  public userName;

  logoutClick = false;

  constructor(private router: Router, private observer: BreakpointObserver, private imageService: ImageService,
    public dialog: MatDialog) { }
  ngAfterViewInit(): void {
    this.observer
    .observe(["(max-width: 700px)"])
    .pipe(delay(1)) // delay 1mS
    .subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = "over";
        this.sidenav.close();
      } else {
        this.sidenav.mode = "side";
        this.sidenav.open();
      }
    });
  }

  ngOnInit() {
    this.getPhoto('random/200x200/?female,face');
    this.userName = localStorage.getItem("currentUserName");
  }

  onClickProfile() {

    this.router.navigate(['/my_profile']);

  }
  getPhoto(subject: string): void {
    this.imageData$ = this.imageService.photoQuery(subject);
  }
  animal: string;
  name: string;

  onClickLogout() {
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
    private router: Router,

  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onLogoutClick() {
    this.dialogRef.close();

    console.log("cleared User Id " + localStorage.getItem("currentUserId"));
    localStorage.clear();

    this.snackBar.open("User Logged Out", "Close", {
      duration: 2000, verticalPosition: 'top', panelClass: ['green-snackbar']
    });

    this.router.navigate(['']);


  }

}
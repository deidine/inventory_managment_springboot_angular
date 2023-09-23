// import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar, MatTableDataSource, MatPaginator, Sort, MatSort } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Personnelle } from '../Personnelle';
import { PersonnelleService } from '../personnelle.service';
import { UserProfile } from '../../models/UserModels'; 
import { LoginCheckService } from '../../login/services/login-check.service';
@Component({
  selector: 'personnelles',
  templateUrl: './personnelles.component.html',
  styleUrls: ['./personnelles.component.css']
})
export class PersonnellesComponent implements OnInit {
  
  public userName = localStorage.getItem("currentUserName");

  public user : UserProfile;

  addButton = true;  
  addPersonnelle = false;
  editPersonnelleBtn = false;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
   
  personnelle: any;

  length :number ;
  pageSize = 5;
  pageSizeOptions: number[] = [2, 5, 10];

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  // sortedData: personnellesorted = new Personnelle();
  constructor(private personnelleService: PersonnelleService,
              private userProfileService : LoginCheckService,
              private snackBar: MatSnackBar,
              private router :Router,
              ) { 
 }

  ngOnInit() {
    this.personnelleService.getPersonnelles().subscribe(
      response => {
        console.log(response)
        this.personnelle=response;
        this.personnelles = new MatTableDataSource(this.personnelle);
        this.personnelles.sort = this.sort;
        this.length = response.length;
        this.personnelles.paginator = this.paginator;
      }
      ,err=> alert("eroor")
      );

  }

  public personnelles: MatTableDataSource<any>;

  ngAfterViewInit() {
   
  }

  starter(){
  
  }


  handleSuccessfulResponse(response)
  {
    this.user = response;
    this.userName = this.user.username;
   
  }

  onClickProfile(){
    
    this.router.navigate(['/my_profile']);

  }

  onClickLogout(){
    console.log("Logout Clicked");
    
      console.log("cleared User Id "+localStorage.getItem("currentUserId") );
      localStorage.clear();

      this.snackBar.open("User Logged Out", "Close", {
        duration: 2000,verticalPosition: 'top',panelClass: ['green-snackbar']
      });

      this.router.navigate(['']);
    
  }

  handle(response){
   
  }

  displayedColumns: string[] = ['id','email','nom',  'telephone','role_systm' ,'fn_dans_entite', 'edit' ,'delete'];

  editPersonnelle(element){
    let personnelleId = element.id;

    console.log(personnelleId);

    this.router.navigate(['/edit-personnelle'],{queryParams:{personnelleId:personnelleId}})
  }

  deletePersonnelle(element){
    let personnelleId = element.id;
    this.personnelleService.deletePersonnelle(personnelleId).subscribe( data => {
      console.log(data);
      this.router.navigate(['/personnelle']);
      alert("deleted")

      // this.getEmployees();
    },
    err=>alert("not deleted"))
  this.reloadPage()
  }

  handleUpdate(resp){
    console.log("Updated Personnelle");

    this.snackBar.open("Personnelle Updated", "Close", {
      duration: 4000,verticalPosition: 'top',panelClass: ['green-snackbar']
    });

    this.personnelleService.getPersonnelles().subscribe(response => this.handle(response));

  }

  public onClickCancel(){
    this.addButton=!this.addButton;
    this.addPersonnelle=!this.addPersonnelle;
    this.personnelleService.getPersonnelles().subscribe(response => this.handle(response));

  }

  reloadPage(): void {
    window.location.reload();
  }
  onClickAddPersonnelle(){
   
    console.log("Routing to add New_Personnelle page");

    this.router.navigate(['/add-personnel']);

  }

  // sortData(sort: Sort) {
  //   const data = this.Personnelles.slice();
  //   if (!sort.active || sort.direction === '') {
  //     this.sortedData = data;
  //     return;
  //   }

  //   this.sortedData = data.sort((a, b) => {
  //     const isAsc = sort.direction === 'asc';
  //     switch (sort.active) {
  //       case 'PersonnelleId': return compare(a.PersonnelleId, b.PersonnelleId, isAsc);
  //       case 'PersonnelleName': return compare(a.PersonnelleName, b.PersonnelleName, isAsc);
  //       case 'PersonnelleStatus': return compare(a.PersonnelleStatus, b.PersonnelleStatus, isAsc);
  //       case 'PersonnelleCost': return compare(a.PersonnelleCost, b.PersonnelleCost, isAsc);
  //       default: return 0;
  //     }
  //   });
  // }

}

// function compare(a: number | string, b: number | string, isAsc: boolean) {
//   return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
// }
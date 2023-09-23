// import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar, MatTableDataSource, MatPaginator, Sort, MatSort } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Equipement } from './equipement';
import { EquipementService } from './equipement.service';
import { UserProfile } from '../models/UserModels';
import { LoginCheckService } from '../login/services/login-check.service';
@Component({
  selector: 'equipements',
  templateUrl: './equipements.component.html',
  styleUrls: ['./equipements.component.css']
})
export class EquipementsComponent implements OnInit {

  public userName = localStorage.getItem("currentUserName");

  public user: UserProfile;

  addButton = true;
  addequipement = false;
  editequipementBtn = false;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  equipement: any;

  length: number;
  pageSize = 5;
  pageSizeOptions: number[] = [2, 5, 10];
  filterChecked: any;
  isfilterChecked: boolean;
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  sortedData: Equipement = new Equipement();
  constructor(private equipementService: EquipementService,
    private userProfileService: LoginCheckService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {
  }

  ngOnInit() {

    this.equipementService.getEquipements().subscribe(
      response => {
        console.log(response)
        this.equipement = response;
        this.equipements = new MatTableDataSource(this.equipement);
        this.equipements.sort = this.sort;
        this.length = response.length;
        this.equipements.paginator = this.paginator;
      });

  }
  public equipements: MatTableDataSource<any>;
  /* configure filter */


  
  
  checkCheckBoxvalue(event) {
    this.filterChecked = event.target.name
    this.isfilterChecked=event.target.checked
    console.log("deidine "   + event.target.name)
  }
  
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.equipements.filter = filterValue;

        this.equipements.filterPredicate = (data: Equipement, filter: string) => data.etat.indexOf(filter) != -1;
  }
  ngAfterViewInit() {
    if(this.isfilterChecked){
  
      if (this.filterChecked === 'vendeur') {
        
        this.equipements.filterPredicate = (data: Equipement, filter: string) => data.vendeur.indexOf(filter) != -1;
      }  
      else if(this.filterChecked === 'etat'){
        
        this.equipements.filterPredicate = (data: Equipement, filter: string) => data.etat.indexOf(filter) != -1;
      } 
       else if(this.filterChecked === 'type'){
        
        this.equipements.filterPredicate = (data: Equipement, filter: string) => data.type.indexOf(filter) != -1;
      }
    
    }else{
  
        // this.equipements.filterPredicate = (data: Equipement, filter: string) => data.etat.indexOf(filter) != -1;
    }
    
  }

  starter() {

  }


  handleSuccessfulResponse(response) {
    this.user = response;
    this.userName = this.user.username;

  }

  onClickProfile() {

    this.router.navigate(['/my_profile']);

  }

  onClickLogout() {
    console.log("Logout Clicked");

    console.log("cleared User Id " + localStorage.getItem("currentUserId"));
    localStorage.clear();

    this.snackBar.open("User Logged Out", "Close", {
      duration: 2000, verticalPosition: 'top', panelClass: ['green-snackbar']
    });

    this.router.navigate(['']);

  }

  handle(response) {

  }


  displayedColumns: string[] = ['Id','Anne_aquisition', 'Antivirus_active',
    'Etat', 'SiOrdinateur'
    , 'Reference', 'System_active', 'Modele',
    'Type', 'Vendeur', 'buro', 'edit'];

  editequipement(element) {
    let equipementId = element.id;

    console.log(equipementId);

    this.router.navigate(['/edit-equipment'], { queryParams: { equipementId: equipementId } })
  }


  handleUpdate(resp) {
    console.log("Updated equipement");

    this.snackBar.open("equipement Updated", "Close", {
      duration: 4000, verticalPosition: 'top', panelClass: ['green-snackbar']
    });

    this.equipementService.getEquipements().subscribe(response => this.handle(response));

  }

  public onClickCancel() {
    this.addButton = !this.addButton;
    this.addequipement = !this.addequipement;
    this.equipementService.getEquipements().subscribe(response => this.handle(response));

  }

  onClickAddequipement() {

    console.log("Routing to add New_equipement page");

    this.router.navigate(['/add-equipment']);


  }

  // sortData(sort: Sort) {
  //   const data = this.equipements.slice();
  //   if (!sort.active || sort.direction === '') {
  //     this.sortedData = data;
  //     return;
  //   }

  //   this.sortedData = data.sort((a, b) => {
  //     const isAsc = sort.direction === 'asc';
  //     switch (sort.active) {
  //       case 'equipementId': return compare(a.equipementId, b.equipementId, isAsc);
  //       case 'equipementName': return compare(a.equipementName, b.equipementName, isAsc);
  //       case 'equipementStatus': return compare(a.equipementStatus, b.equipementStatus, isAsc);
  //       case 'equipementCost': return compare(a.equipementCost, b.equipementCost, isAsc);
  //       default: return 0;
  //     }
  //   });
  // }

}

// function compare(a: number | string, b: number | string, isAsc: boolean) {
//   return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
// }
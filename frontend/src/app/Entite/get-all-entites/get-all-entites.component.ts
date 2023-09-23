import { MatSnackBar, MatTableDataSource, MatPaginator, Sort, MatSort } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Entite} from '../Entite';
import { EntiteService } from '../services/entite.service';
import { RouterService } from '../services/router.service';
import { SharedServiceService } from '../services/shared-service.service';
import { SuccessfulDialogComponent } from '../successful-dialog/successful-dialog.component';
import { UnSuccessfulDialogComponent } from '../un-successful-dialog/un-successful-dialog.component';

@Component({
  selector: 'app-get-all-entites',
  templateUrl: './get-all-entites.component.html',
  styleUrls: ['./get-all-entites.component.css']
})
export class GetAllentitesComponent implements OnInit {
 
 entite:any;

  constructor(private entiteService: EntiteService,public dialog: MatDialog, private sharedServices: SharedServiceService, private routerService:RouterService) { }

  ngOnInit(): void {
    this.entiteService.getAllEntites().subscribe(data => {
 
     this.entiteList  = new MatTableDataSource(data);
      
    });
  }
  public entiteList: MatTableDataSource<any>;

  deleteentite(entiteId: string){

    this.entiteService.deleteEntite(entiteId).subscribe(data => {

      if(data)
      {
        this.openSuccessfulDialog();
        this.ngOnInit();
      }
      else{
        this.openunSuccessfulDialog();
        this.ngOnInit();
      }
      
    });
  }

  updateentite(entite: Entite){

  //   this.sharedServices.getEntite(entite);
  //   this.routerService.routeToUpdateentite();
  }

   
  openSuccessfulDialog() {
    this.sharedServices.setdialogtitle("Successfull");
    this.sharedServices.setdialogcontent("entite Deleted Successfully !!");
    this.dialog.open(SuccessfulDialogComponent);
  }
  displayedColumns: string[] = ['entiteName', 'entiteId', 'affectation', 'type' ,'edit', 'delete'];

  openunSuccessfulDialog() {
    this.sharedServices.setdialogtitle("Unsuccessfull");
    this.sharedServices.setdialogcontent("entite could not be Deleted !!");
    this.dialog.open(UnSuccessfulDialogComponent);
  }
  
  key: string ='id';
  reverse: boolean=false;
  sort(key:string)
  {
    this.key=key;
    this.reverse=!this.reverse;
  }

}

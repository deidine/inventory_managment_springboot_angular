// import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar, MatTableDataSource, MatPaginator, Sort, MatSort } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Departement } from '../models/department';
import { DepartementService } from '../services/department.service';
import { UserProfile } from '../models/UserModels';
import { LoginCheckService } from '../login/services/login-check.service';

@Component({
  selector: 'department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class departmentComponent implements OnInit {

  public userName = localStorage.getItem("currentUserName");

  public user: UserProfile;

  addButton = true;
  addProduct = false;
  editProductBtn = false;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  department: any;
  deidine: any;
  length: number;
  pageSize = 5;
  pageSizeOptions: number[] = [2, 5, 10];

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  sortedData: Departement = new Departement();
  constructor(private departmentervice: DepartementService,
    private userProfileService: LoginCheckService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {

  }

  ngOnInit() {
    // if(localStorage.getItem("currentUserRole")==`["ROLE_CLIENT"]`){

    this.departmentervice.getDepartements().subscribe(
      response => {

        this.department = response;
        this.deidine = this.department.entite;
        this.departments = new MatTableDataSource(this.department);
        this.department.sort = this.sort;
        this.length = response.length;
        this.department.paginator = this.paginator;
        console.log("deidine " + this.department)
      });
    // }
  }


  public departments: MatTableDataSource<any>;

  ngAfterViewInit() {

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

  displayedColumns: string[] = ['departmentName', 'departmentId', 'departmentUrl', 'departmentTitre', 'departmentEntite', 'edit', 'delete'];

  editdepartment(element) {
    let departmentId = element.departmentId;

    console.log(departmentId);

    // this.router.navigate(['/edit-department',element])
    this.router.navigate(['/edit-department'], { queryParams: { departmentId: departmentId } })
  }

  deletedepartment(element) {
    let departmentId = element.departmentId;
    this.departmentervice.deleteDepartment(departmentId).subscribe(data => {
      console.log(data);
      this.router.navigate(['/department']);
      alert("deleted")

      // this.getEmployees();
    },
      err => alert("not deleted"))
    console.log(departmentId);
    this.reloadPage()
  }


  handleUpdate(resp) {
    console.log("Updated Product");

    this.snackBar.open("Product Updated", "Close", {
      duration: 4000, verticalPosition: 'top', panelClass: ['green-snackbar']
    });

    this.departmentervice.getDepartements().subscribe(response => this.handle(response));

  }

  public onClickCancel() {
    this.addButton = !this.addButton;
    this.addProduct = !this.addProduct;
    this.departmentervice.getDepartements().subscribe(response => this.handle(response));

  }

  onClickAddDepartment() {

    console.log("Routing to add New_product page");

    this.router.navigate(['/add-dep']);

  }

  sortData(sort: Sort) {
    const data = this.department.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'departmentUrl': return compare(a.departmentUrl, b.departmentUrl, isAsc);
        case 'departmentId': return compare(a.departmentId, b.departmentId, isAsc);
        case 'departmentName': return compare(a.departmentName, b.departmentName, isAsc);
        case 'departmentTire': return compare(a.departmentTire, b.departmentTire, isAsc);
        default: return 0;
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }
}

// function compare(productId: any, productId1: any, isAsc: boolean) {
//   throw new Error('Function not implemented.');
// }
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
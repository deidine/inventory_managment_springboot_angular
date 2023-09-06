import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sidenavbar',
  templateUrl: './sidenavbar.component.html',
  styleUrls: ['./sidenavbar.component.css']
})
export class SidenavbarComponent implements OnInit {

  adminSidepanel = false;
  distributorSidePanel = false;
  retailerSidePanel = false;
  

  constructor() { }

  ngOnInit() {
    this.activeSidePanel();
  }

  activeSidePanel(){
    let userRole = localStorage.getItem("currentUserRole");
    
    if(userRole === '1')
    {
      this.adminSidepanel = true;
    }
    else if(userRole === '2')
    {
      this.distributorSidePanel = true;
    }
    else if(userRole === '3')
    {
      this.retailerSidePanel = true;
    }

  }


}

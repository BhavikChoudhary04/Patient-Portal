import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {


  @Output() sidenavClose = new EventEmitter();
  constructor() { }

  ngOnInit() {
   
  }

  public canAccessPage(pageRoute : string)
  {
    return
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }

 

  logOut() {
  
  }


}

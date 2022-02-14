import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalComponent } from 'src/app/shared/modal/modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() public sidenavToggle = new EventEmitter();

  constructor(private router:Router,public matDialog: MatDialog) { }

  ngOnInit() {
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

  openLogoutModal() {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "180px";
    dialogConfig.width = "350px";
    dialogConfig.data = {
      name: "logout",
      title: "Are you sure you want to logout?",
      // description: ":)",
      actionButtonText: "Logout"
    }
    const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);
  }
}

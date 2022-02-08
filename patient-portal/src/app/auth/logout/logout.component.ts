import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/shared/modal/modal.component';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(public matDialog: MatDialog) { }

  ngOnInit(): void {

  }
 
  openLogoutModal() {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "220px";
    dialogConfig.width = "400px";
    dialogConfig.data = {
      name: "logout",
      title: "Are you sure you want to logout?",
      // description: ":)",
      actionButtonText: "Logout"
    }
    const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);
  }
}

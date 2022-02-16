import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/shared/modal/modal.component';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})

export class PatientComponent implements OnInit {
  constructor(public matDialog: MatDialog) {
    
   }

  ngOnInit(): void {
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

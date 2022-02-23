import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  name!:string
  constructor(public matDialog: MatDialog, private userService:UserService) {
    
  }

 ngOnInit(): void {
  this.userService.fetchAllUsers();

   const sessionUser = sessionStorage.getItem("user")
   if (sessionUser){
     const user = JSON.parse(sessionUser)
     this.name = user.firstName
   }
 }

 openLogoutModal() {
  const dialogConfig = new MatDialogConfig();
  // The user can't close the dialog by clicking outside its body
  dialogConfig.disableClose = true;
  dialogConfig.id = "modal-component";
  dialogConfig.height = "220px";
  dialogConfig.width = "370px";
  dialogConfig.data = {
    name: "logout",
    title: "Are you sure? ",
    description: "You want to logout?",
    actionButtonText: "Logout"
  }
  const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);
}

}

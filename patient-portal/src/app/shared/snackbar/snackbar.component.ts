import { Component, OnInit, Inject } from '@angular/core';
import {MatSnackBarRef, MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';
import { SnackbarActionsService } from 'src/app/services/snackbar-actions.service';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css']
})
export class SnackbarComponent implements OnInit {


  //  Send information in "data" object which contains 
  // message: message to be displayed
  //  btn: button value to be displayed
  // action: to be given to service to perform an action

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any,

    public snackBarRef: MatSnackBarRef<SnackbarComponent>,
    public snackBarService: SnackbarActionsService
    ) { }

  ngOnInit(): void {
  }

  action(){
    this.snackBarService.performAction(this.data.action)
    this.snackBarRef.dismiss();
  }

}

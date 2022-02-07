import { Component, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import { PatientComponent } from '../patient.component';

@Component({
  selector: 'app-schedule-appointment',
  templateUrl: './schedule-appointment.component.html',
  styleUrls: ['./schedule-appointment.component.css']
})
export class ScheduleAppointmentComponent implements OnInit {

  constructor(
    private dialog: MatDialog
    ) {
    
   }

  ngOnInit(): void {
  }

  openPhysicianForm() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '100%';
    dialogConfig.height = '100%';
    this.dialog.open(PatientComponent, dialogConfig);
  }

  openSpecialityForm() {

  }

}

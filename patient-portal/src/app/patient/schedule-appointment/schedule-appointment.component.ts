import { Component, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { AppointmentsService } from 'src/app/services/appointments.service';

@Component({
  selector: 'app-schedule-appointment',
  templateUrl: './schedule-appointment.component.html',
  styleUrls: ['./schedule-appointment.component.css']
})
export class ScheduleAppointmentComponent implements OnInit {

  physicianForm!: FormGroup
  patientData: any;

  constructor(
    private fb:FormBuilder,
    private router:Router,
    public dialog: MatDialog,
    private appointments: AppointmentsService
    ) {
      this.createPhysicianForm();
   }

  //  data =[ {
  //   "name": "Harry",
  //   "availableDate": [
  //     "20/02/2022",
  //     "09/03/2022",
  //     "11/03/2022",
  //     "20/03/2022"
  //   ],
  //   "availabletime": [
  //     "09:00 AM",
  //     "11:00 AM",
  //     "02:00 PM",
  //     "05:00 PM"
  //   ]
  // },
  // {
  //   "name": "Matt Murdock",
  //   "availableDate": [
  //     "21/02/2022",
  //     "03/03/2022",
  //     "10/03/2022",
  //     "17/03/2022"
  //   ],
  //   "availabletime": [
  //     "10:00 AM",
  //     "12:00 PM",
  //     "02:00 PM",
  //     "06:00 PM"
  //   ]
  // },
  // {
  //   "name": "Frank Castle",
  //   "availableDate": [
  //     "23/02/2022",
  //     "08/03/2022",
  //     "11/03/2022",
  //     "19/03/2022"
  //   ],
  //   "availabletime": [
  //     "08:00 AM",
  //     "11:00 AM",
  //     "01:00 PM",
  //     "04:00 PM"
  //   ]
  // },
  // {
  //   "name": "Bruce Banner",
  //   "availableDate": [
  //     "25/02/2022",
  //     "27/02/2022",
  //     "01/03/2022",
  //     "15/03/2022"
  //   ],
  //   "availabletime": [
  //     "09:00 AM",
  //     "10:30 AM",
  //     "04:00 PM",
  //     "07:00 PM"
  //   ]
  // }]

  ngOnInit(): void {
    this.appointments.getPhysician().subscribe(data => {
      console.log(data);
      this.patientData = data;
    })
  }

  createPhysicianForm(){
    this.physicianForm = this.fb.group({
      meetingTitle : ['', [Validators.required,Validators.maxLength(20), Validators.pattern('^[a-zA-Z ]*$')]],
      description : ['', Validators.required],
      physician : ['', Validators.required],
      date : ['', Validators.required],
      time : ['', Validators.required],
      // reason : ['', Validators.required],
      mobile : ['', [Validators.required, Validators.minLength(10), 
                     Validators.maxLength(10),Validators.pattern("^[6-9][0-9]+")]]
    })
  }

  // openPhysicianForm() {
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.disableClose = true;
  //   dialogConfig.autoFocus = true;
  //   dialogConfig.width = '100%';
  //   dialogConfig.height = '100%';
  //   this.dialog.open(PhysicianBookAppointmentDialog, dialogConfig);
  // }

  submitPhysicianForm(){
    if (this.physicianForm.invalid) return
      // this.router.navigateByUrl('/login');
      console.log(this.physicianForm.value);
      // alert(this.physicianForm.value);
      // this.onClose();
      this.physicianForm.reset();
      this.appointments.createAppointment(this.physicianForm.value);
      const dialogRef = this.dialog.open(PhysicianBookAppointmentDialog);
  }

  // onClose() {
  //   this.dialogRef.close();
  // }

  // openSpecialityForm() {

  // }

}

@Component({
  selector: 'physician-book-appointment-dialog',
  templateUrl: 'physician-book-appointment-dialog.html',
})
export class PhysicianBookAppointmentDialog {}

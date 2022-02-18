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
  showDetails:boolean =false


  constructor(
    private fb:FormBuilder,
    private router:Router,
    public dialog: MatDialog,
    private appointments: AppointmentsService
    ) {
      this.createPhysicianForm();
   }

  ngOnInit(): void {
    this.appointments.getPhysician().subscribe(data => {
      if(data){
        console.log(data);
        this.patientData = data;
        this.showDetails = true
      }
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

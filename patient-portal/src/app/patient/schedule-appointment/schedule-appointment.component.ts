import { Component, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

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
    this.dialog.open(PhysicianBookAppointmentDialog, dialogConfig);
  }

  openSpecialityForm() {

  }

}

@Component({
  selector: 'app-physician-book-appointment',
  templateUrl: './physician-book-appointment-dialog.html',
  styleUrls: ['./schedule-appointment.component.css']
})
export class PhysicianBookAppointmentDialog implements OnInit {

  physicianForm!: FormGroup

  constructor(
    private fb:FormBuilder,
    private router:Router,
    public dialogRef: MatDialogRef<ScheduleAppointmentComponent>
  ) {
    this.createPhysicianForm();
   }

  ngOnInit(): void {
  }

  createPhysicianForm(){
    this.physicianForm = this.fb.group({
      meetingTitle : ['', [Validators.required,Validators.maxLength(20), Validators.pattern('^[a-zA-Z ]*$')]],
      description : ['', Validators.required],
      physician : ['', Validators.required],
      // date : ['', Validators.required],
      time : ['', Validators.required],
      // reason : ['', Validators.required],
      mobile : ['', [Validators.required, Validators.minLength(10), 
                     Validators.maxLength(10),Validators.pattern("^[6-9][0-9]+")]]
    })
  }

  submitPhysicianForm(){
    if (this.physicianForm.invalid) return
      // this.router.navigateByUrl('/auth/login');
      console.log(this.physicianForm.value);
      // alert(this.physicianForm.value);
      this.onClose();
  }

  onClose() {
    this.dialogRef.close();
  }

}

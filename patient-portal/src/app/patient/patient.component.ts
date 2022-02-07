import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { ScheduleAppointmentComponent } from './schedule-appointment/schedule-appointment.component';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

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
      meetingTitle : ['', Validators.required],
      description : ['', Validators.required],
      physician : ['', Validators.required],
      date : ['', Validators.required],
      time : ['', Validators.required],
      reason : ['', Validators.required],
      mobile : ['', [Validators.required, Validators.minLength(10), 
                     Validators.maxLength(10),Validators.pattern("^[6-9][0-9]+")]]
    })
  }

  submitPhysicianForm(){
    if (this.physicianForm.invalid) return
      // this.router.navigateByUrl('/auth/login');
      // console.log(this.physicianForm.value);
      alert(this.physicianForm.value);
      this.onClose();
  }

  onClose() {
    this.dialogRef.close();
  }

}

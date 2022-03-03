import { Component, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { Appointment } from 'src/app/shared/interfaces/appointment';

@Component({
  selector: 'app-schedule-appointment',
  templateUrl: './schedule-appointment.component.html',
  styleUrls: ['./schedule-appointment.component.css']
})
export class ScheduleAppointmentComponent implements OnInit {

  physicianForm!: FormGroup
  patientData: any;
  showDetails:boolean =false;

  physicians: any;

  minDate!: Date;
  maxDate!: Date;

  selectPhysician: any = {
    name: ''
  };

  index:number =0
  currentPhysician!:any
  currentDate!:[]
  currentTime!:[]
  selectedPhysician: [] = []
  currentYear!: number;

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
        this.showDetails = true;
      }
      this.showAll();
    })

    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 0, 2, 3);
    this.maxDate = new Date(currentYear + 0, 3, 29);
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

  showAll() {
    this.appointments.getPhysician().subscribe(
      (data:any)=>{
        this.physicians = data;
        console.log(this.physicians);
      }
    )
  }

  onSelect(physician_name: any) {
    console.log(physician_name)
    this.patientData.forEach((element: any) => {
      if(element.name === physician_name) {
        console.log(element)
        this.currentPhysician = element
        console.log('this.currentPhysician: ', this.currentPhysician);
        this.currentDate = this.currentPhysician.availableDate
        this.currentTime = this.currentPhysician.availabletime
      }
    });
  }

  submitPhysicianForm(){
    if (this.physicianForm.invalid) return
      // this.router.navigateByUrl('/auth/login');
      // alert(this.physicianForm.value);
      // this.onClose();
      console.log(this.physicianForm.value);
      this.appointments.createAppointment(this.physicianForm.value);
      // const dialogRef = this.dialog.open(PhysicianBookAppointmentDialog);
      this.physicianForm.reset();
  }

  onClose() {
    this.physicianForm.reset();
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;

    // const currentYear = new Date().getFullYear();
    // const year = (d || new Date()).getFullYear();
    // return year >= this.currentYear -1 && year <= this.currentYear + 1;
  };
}

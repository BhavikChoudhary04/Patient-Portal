import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { Appointment } from 'src/app/shared/interfaces/appointment';

@Component({
  selector: 'app-appointment-history',
  templateUrl: './appointment-history.component.html',
  styleUrls: ['./appointment-history.component.css']
})
export class AppointmentHistoryComponent implements OnInit {

  apHistory!: Appointment[]

  constructor(private apService: AppointmentsService) { }

  ngOnInit(): void {
    this.apService.fetchAllAppointments();
    this.apService.getAppointments().subscribe(app => {
      this.apHistory = app.filter(e => {
        const date = new Date(e.date.split('/').reverse().join('/'));
        return date < new Date("")
      })
    })
  }

  


}

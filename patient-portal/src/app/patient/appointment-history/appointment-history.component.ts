import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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
  displayedColumns: string[] = ['date', 'time', 'physician','status', 'notes'];
  @ViewChild(MatSort) sort !: MatSort;
  @ViewChild( MatPaginator ) paginator !: MatPaginator;


  app_histroy_records !: MatTableDataSource<any>
  constructor(private apService: AppointmentsService) { }

  ngOnInit(): void {
    this.apService.fetchAllAppointments();
    this.apService.getAppointments().subscribe(app => {
      this.apHistory = app.filter(e => {
        const date = new Date(e.date.split('/').reverse().join('/'));
        return date < new Date()
      })

      this.app_histroy_records = new MatTableDataSource([...this.apHistory]);
      this.app_histroy_records.sort = this.sort;
      this.app_histroy_records.paginator = this.paginator;
    })
  }

  


}

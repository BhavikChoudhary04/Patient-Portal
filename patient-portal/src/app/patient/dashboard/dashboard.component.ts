import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { Appointment } from 'src/app/shared/interfaces/appointment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  startDate!:Date 
  endDate!:Date
  
  allAppointments!: Appointment[]
  displayAppointments!: Appointment[]



  constructor(private apService: AppointmentsService) { }

  ngOnInit(): void {
    this.apService.fetchAllAppointments();
    this.apService.getAppointments().subscribe(app => {
      // console.log('dashboard app: ' ,app)
      this.allAppointments = app
      this.displayAppointments = this.allAppointments.filter(e => {
        const date = new Date(e.date.split('/').reverse().join('/'));        
        return date >= new Date();
      })
    })
  }

  assignStartDate(date:Date){
    this.startDate=date
    this.checkAppointments();
  }

  assignEndDate(date:Date){
    this.endDate=date
    this.checkAppointments();
  }

  checkAppointments(){
    
    if (this.startDate && this.endDate){
      this.displayAppointments = this.allAppointments.filter(e => {
        const date = new Date(e.date.split('/').reverse().join('/'));        
        return date <= this.endDate && date >= this.startDate
      })
    } else if (this.startDate){
      this.displayAppointments = this.allAppointments.filter(e => {
        const date = new Date(e.date.split('/').reverse().join('/'));
        return date >= this.startDate
      })
    } else if (this.endDate){
      this.displayAppointments = this.allAppointments.filter(e => {
        const date = new Date(e.date.split('/').reverse().join('/'));
        return date <= this.endDate
      })
    } else {
      this.displayAppointments = this.allAppointments
    }
  }

  
}

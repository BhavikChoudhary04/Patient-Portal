import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppComponent } from '../app.component';
import { Appointment } from '../shared/interfaces/appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  constructor(private http: HttpClient) { }

  private API_URL = 'http://127.0.0.1:3000';

  private appointments$:BehaviorSubject<Appointment[]> = new BehaviorSubject<Appointment[]>([]);

  private physician$:BehaviorSubject<object[]> = new BehaviorSubject<object[]>([
    {
      "name": "Harry",
      "availableDate": [
        "20/02/2022",
        "09/03/2022",
        "11/03/2022",
        "20/03/2022"
      ],
      "availabletime": [
        "09:00 AM",
        "11:00 AM",
        "02:00 PM",
        "05:00 PM"
      ]
    },
    {
      "name": "Matt Murdock",
      "availableDate": [
        "21/02/2022",
        "03/03/2022",
        "10/03/2022",
        "17/03/2022"
      ],
      "availabletime": [
        "10:00 AM",
        "12:00 PM",
        "02:00 PM",
        "06:00 PM"
      ]
    },
    {
      "name": "Frank Castle",
      "availableDate": [
        "23/02/2022",
        "08/03/2022",
        "11/03/2022",
        "19/03/2022"
      ],
      "availabletime": [
        "08:00 AM",
        "11:00 AM",
        "01:00 PM",
        "04:00 PM"
      ]
    },
    {
      "name": "Bruce Banner",
      "availableDate": [
        "25/02/2022",
        "27/02/2022",
        "01/03/2022",
        "15/03/2022"
      ],
      "availabletime": [
        "09:00 AM",
        "10:30 AM",
        "04:00 PM",
        "07:00 PM"
      ]
    }
  ]);
  
  fetchAllAppointments(){
    this.http.get<Appointment[]>(`${this.API_URL}/appointment-history`).subscribe(app => {
      if (app.length){
        this.appointments$.next(app);
      }
    })
  }

  editAppointment(app:Appointment){
    this.http.put<Appointment>(`${this.API_URL}/appointment-history/${app.id}`, app).subscribe(app => {
      if (app){
        const apps = this.appointments$.getValue();
        const updatedApps = apps.filter(a => a.id != app.id)
        this.appointments$.next(updatedApps.concat(app));
      }
    })
  }

  deleteAppointment(app:Appointment){
    this.http.delete(`${this.API_URL}/appointment-history/${app.id}`).subscribe(appointment => {
        const apps = this.appointments$.getValue();
        const updatedApps = apps.filter(a => a.id != app.id)
        this.appointments$.next(updatedApps);
      
    })
  }

  createAppointment(app:Appointment){
    this.http.post<Appointment>(`${this.API_URL}/appointment-history`, app).subscribe(appointment => {
      if (appointment){
        const apps = this.appointments$.getValue();
        this.appointments$.next(apps.concat(appointment))
      }
    })
  }

  getAppointments(){
    return this.appointments$.asObservable();
  }

  getPhysician() {
    return this.physician$.asObservable();
  }

}

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

  private API_URL = 'http://127.0.0.1:3000/appointment-history';

  private appointments$:BehaviorSubject<Appointment[]> = new BehaviorSubject<Appointment[]>([]);

  fetchAllAppointments(){
    this.http.get<Appointment[]>(`${this.API_URL}`).subscribe(app => {
      if (app.length){
        this.appointments$.next(app);
      }
    })
  }

  editAppointment(app:Appointment){
    this.http.put<Appointment>(`${this.API_URL}/${app.id}`, app).subscribe(app => {
      if (app){
        const apps = this.appointments$.getValue();
        const updatedApps = apps.filter(a => a.id != app.id)
        this.appointments$.next(updatedApps.concat(app));
      }
    })
  }

  deleteAppointment(app:Appointment){
    this.http.delete(`${this.API_URL}/${app.id}`).subscribe(appointment => {
        const apps = this.appointments$.getValue();
        const updatedApps = apps.filter(a => a.id != app.id)
        this.appointments$.next(updatedApps);
      
    })
  }

  createAppointment(app:Appointment){
    this.http.post<Appointment>(`${this.API_URL}`, app).subscribe(appointment => {
      if (appointment){
        const apps = this.appointments$.getValue();
        this.appointments$.next(apps.concat(appointment))
      }
    })
  }

  getAppointments(){
    return this.appointments$.asObservable();
  }

}

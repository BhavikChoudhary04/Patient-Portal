import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { AppComponent } from '../app.component';
import { Appointment } from '../shared/interfaces/appointment';
import { SnackbarComponent } from '../shared/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  private API_URL = 'http://127.0.0.1:3000';

  private appointments$: BehaviorSubject<Appointment[]> = new BehaviorSubject<Appointment[]>([]);

  private physician$: BehaviorSubject<object[]> = new BehaviorSubject<object[]>([
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

  async fetchAllAppointments() {
    try {
      const app = await this.http.get<Appointment[]>(`${this.API_URL}/appointment-history`).toPromise();
    
      if (app.length) {
        this.appointments$.next(app);
      } else {
        this.snackBar.openFromComponent(SnackbarComponent, {
          data: {
            message: `Server error. Please try again.`,
            btn: "OK",
            action: ""
          }
        });
      }
    } catch (err) {
      this.snackBar.openFromComponent(SnackbarComponent, {
        data: {
          message: `Server error. Please try again.`,
          btn: "OK",
          action: ""
        }
      });
    }
  
  }

  async editAppointment(app: Appointment) {
    try {
      const appt = await this.http.put<Appointment>(`${this.API_URL}/appointment-history/${app.id}`, app).toPromise();
  
      if (appt) {
        const apps = this.appointments$.getValue();
        const updatedApps = apps.filter(a => a.id != app.id)
        this.appointments$.next(updatedApps.concat(appt));
        this.snackBar.openFromComponent(SnackbarComponent, {
          data: {
            message: `Your details have been saved.`,
            btn: "OK",
            action: ""
          }
        });
      } else {
        this.snackBar.openFromComponent(SnackbarComponent, {
          data: {
            message: `Server error. Please try again.`,
            btn: "OK",
            action: ""
          }
        });
      }
    } catch (err) {
      this.snackBar.openFromComponent(SnackbarComponent, {
        data: {
          message: `Server error. Please try again.`,
          btn: "OK",
          action: ""
        }
      });
    }
  
  }

  async deleteAppointment(app: Appointment) {
    try {
      await this.http.delete(`${this.API_URL}/appointment-history/${app.id}`).toPromise();
      const appointment = await this.http.get<Appointment[]>(`${this.API_URL}/appointment-history?id=${app.id}`).toPromise();
      
      if (appointment.length) {
        this.snackBar.openFromComponent(SnackbarComponent, {
          data: {
            message: `Server error. Please try again.`,
            btn: "OK",
            action: ""
          }
        });
      } else {
        const apps = this.appointments$.getValue();
        const updatedApps = apps.filter(a => a.id != app.id)
        this.appointments$.next(updatedApps);
        this.snackBar.openFromComponent(SnackbarComponent, {
          data: {
            message: `Appointment deleted.`,
            btn: "OK",
            action: ""
          }
        });
      }
    } catch (err) {
      this.snackBar.openFromComponent(SnackbarComponent, {
        data: {
          message: `Server error. Please try again.`,
          btn: "OK",
          action: ""
        }
      });
    }

  }

  async createAppointment(app: Appointment) {
    try {
      const appointment = await this.http.post<Appointment>(`${this.API_URL}/appointment-history`, app).toPromise();

      if (appointment) {
        console.log('appointment:', appointment)
        const apps = this.appointments$.getValue();
        this.appointments$.next(apps.concat(appointment))
        this.snackBar.openFromComponent(SnackbarComponent, {
          data: {
            message: `New appointment scheduled.`,
            btn: "OK",
            action: ""
          }
        });
      } else {
        this.snackBar.openFromComponent(SnackbarComponent, {
          data: {
            message: `Server error. Please try again.`,
            btn: "OK",
            action: ""
          }
        });
      }
    } catch (err) {
      this.snackBar.openFromComponent(SnackbarComponent, {
        data: {
          message: `Server error. Please try again.`,
          btn: "OK",
          action: ""
        }
      });
    }

  }

  getAppointments() {
    return this.appointments$.asObservable();
  }

  getPhysician() {
    return this.physician$.asObservable();
  }

}

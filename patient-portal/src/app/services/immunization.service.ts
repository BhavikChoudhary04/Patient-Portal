import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { Vaccine } from '../shared/interfaces/vaccine';
import { SnackbarComponent } from '../shared/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class ImmunizationService {

  private API_URL = 'http://127.0.0.1:3000';

  private vaccine$: BehaviorSubject<Vaccine> = new BehaviorSubject<Vaccine>({
    id: 0,
    userId: 0,
    vaccines: []
  });


  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  async getImmunizationDetails(userId: any) {
    try {
      const vaccine = await this.http.get<Vaccine>(`${this.API_URL}/660/immunization?userId=${userId}`).toPromise();

      if (vaccine) {
        this.vaccine$.next(vaccine)
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

  async createImmunizationDetails(imDetail: Vaccine) {
    try {
      const vaccine = await this.http.post<Vaccine>(`${this.API_URL}/660/immunization`, imDetail).toPromise();

      if (vaccine) {
        this.vaccine$.next(vaccine);
        this.snackBar.openFromComponent(SnackbarComponent, {
          data: {
            message: `Immunization details updated.`,
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

  getImmunizations() {
    return this.vaccine$.asObservable()
  }
}

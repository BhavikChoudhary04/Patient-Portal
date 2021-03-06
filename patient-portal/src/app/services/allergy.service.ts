import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserMedicationsAllergies } from '../shared/interfaces/user';
import { SnackbarComponent } from '../shared/snackbar/snackbar.component';


@Injectable({
  providedIn: 'root'
})
export class AllergyService {

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  private API_URL_MEDICATIONS_ALLERGIES = 'http://127.0.0.1:3000';

  private allergies$: BehaviorSubject<UserMedicationsAllergies> = new BehaviorSubject<UserMedicationsAllergies>({
    id: 0,
    userId: 0,
    currentMedication: "",
    otc: "",
    antibiotics: "",
    socialDrugs: "",
    pastMedication: "",
    drugAllergies: "",
    otherAllergies: ""
  })

  async getMedictionsData(userId: number) {
    try {
      const allergies = await this.http.get<UserMedicationsAllergies[]>(`${this.API_URL_MEDICATIONS_ALLERGIES}/660/medication-allergies?userId=${userId}`).toPromise();

      if (allergies.length) {
        this.allergies$.next(allergies[0]);
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

  async addMedicationsData(userData: UserMedicationsAllergies) {
    try {
      const allergyData = await this.http.post<UserMedicationsAllergies>(`${this.API_URL_MEDICATIONS_ALLERGIES}/660/medication-allergies`, userData).toPromise()

      if (allergyData) {
        this.allergies$.next(allergyData);
        this.snackBar.openFromComponent(SnackbarComponent, {
          data: {
            message: `Allergies and Medications updated.`,
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
}
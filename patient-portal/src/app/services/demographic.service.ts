import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';
import { RegisterUser, LoginUser, UserDemographic, UserMedicationsAllergies } from '../shared/interfaces/user';
import { SnackbarComponent } from '../shared/snackbar/snackbar.component';


@Injectable({
  providedIn: 'root'
})
export class DemographicService {

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  private API_URL_DEMOGRAPHICS = 'http://127.0.0.1:3000';

  private userDemographic$: BehaviorSubject<UserDemographic> = new BehaviorSubject<UserDemographic>(
    {
      userId: 0,
      firstName: "",
      lastName: "",
      dob: "",
      mobile: "",
      gender: "",
      ethnicity: "",
      education: "",
      occupation: "",
      address: "",
      medicalHistory: "",
      familymedicalhistory: "",
      surgeries: "",
      insuranceProvider: ""
    });


  createUserDemographic(user: RegisterUser) {
    const demoData = {
      userId: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      dob: user.dob,
      mobile: user.mobile
    }

    this.http.post<UserDemographic>(`${this.API_URL_DEMOGRAPHICS}/demographics`, demoData).subscribe(demoUser => {
      if (demoUser) {
        return
      }
    })
  }

  async editDemographicData(userDemoData: UserDemographic) {
    try {
      const userData = await this.http.put<UserDemographic>(`${this.API_URL_DEMOGRAPHICS}/600/demographics/${userDemoData.id}`, userDemoData).toPromise();
      // .subscribe(userData => {
      if (userData) {
        this.userDemographic$.next(userData);
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

  async fetchDemographicData(userId: number | undefined) {
    try {
      const demoUser = await this.http.get<UserDemographic[]>(`${this.API_URL_DEMOGRAPHICS}/600/demographics?userId=${userId}`).toPromise();

      if (demoUser.length) {
        this.userDemographic$.next(demoUser[0]);
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

  getAllDemographicsData(): Observable<any> {
    return this.userDemographic$.asObservable();
  }

  fetchDemoData(id:number | undefined):Observable<UserDemographic>{
    const newId = id !+ 200
    return this.http.get<UserDemographic>(`${this.API_URL_DEMOGRAPHICS}/600/demographics/${newId}`)
  }

  updateDemoData(newData:UserDemographic){
    this.http.put<UserDemographic>(`${this.API_URL_DEMOGRAPHICS}/600/demographics/${newData.id}`, newData).subscribe(data=>{
      console.log('data:', data);
      this.userDemographic$.next(newData)
    })
  }

}

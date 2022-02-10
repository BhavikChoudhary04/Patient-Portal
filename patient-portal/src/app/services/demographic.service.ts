import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RegisterUser, LoginUser, UserDemographic, UserMedicationsAllergies } from '../shared/interfaces/user';


@Injectable({
  providedIn: 'root'
})
export class DemographicService {

  constructor(private http: HttpClient) { }

  private API_URL_DEMOGRAPHICS = 'http://127.0.0.1:3000/demographics';

  private userDemographic$: BehaviorSubject<UserDemographic> = new BehaviorSubject<UserDemographic>(
    {
      userid: 0,
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
        userid: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        dob: user.dob,
        mobile: user.mobile
      }
  
      this.http.post<UserDemographic>(`${this.API_URL_DEMOGRAPHICS}`,demoData).subscribe(demoUser => {
        if (demoUser){
          return
        }
      })
    }
  
    editDemographicData(userDemoData: UserDemographic){
      this.http.put<UserDemographic>(`${this.API_URL_DEMOGRAPHICS}/${userDemoData.id}`,userDemoData).subscribe(userData => {
        if (userData){
            this.userDemographic$.next(userData);
        }
      })
    }  
  
    fetchDemographicData(userid: number|undefined){
      this.http.get<UserDemographic[]>(`${this.API_URL_DEMOGRAPHICS}`).subscribe(demoUsers => {
        if (demoUsers){
          const demoUserData = demoUsers.filter(u => u.userid == userid)[0];
          this.userDemographic$.next(demoUserData);
        }
      })
    }

    getAllDemographicsData():Observable<any>{
      return this.userDemographic$.asObservable();
    }

}

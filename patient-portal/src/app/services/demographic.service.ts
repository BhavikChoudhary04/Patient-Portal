import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RegisterUser, LoginUser, UserDemographic, UserMedicationsAllergies } from '../shared/interfaces/user';


@Injectable({
  providedIn: 'root'
})
export class DemographicService {

  constructor(private http: HttpClient) { }

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
  
      this.http.post<UserDemographic>(`${this.API_URL_DEMOGRAPHICS}/demographics`,demoData).subscribe(demoUser => {
        if (demoUser){
          console.log(demoUser);
          
          return
        }
      })
    }
  
    editDemographicData(userDemoData: UserDemographic){
      this.http.put<UserDemographic>(`${this.API_URL_DEMOGRAPHICS}/600/demographics/${userDemoData.id}`,userDemoData).subscribe(userData => {
        if (userData){
            this.userDemographic$.next(userData);
        }
      })
    }  
  
    fetchDemographicData(userId: number|undefined){
      this.http.get<UserDemographic[]>(`${this.API_URL_DEMOGRAPHICS}/600/demographics`).subscribe(demoUsers => {
        if (demoUsers){
          const demoUserData = demoUsers.filter(u => u.userId == userId)[0];
          this.userDemographic$.next(demoUserData);
        }
      })
    }

    getAllDemographicsData():Observable<any>{
      return this.userDemographic$.asObservable();
    }

}

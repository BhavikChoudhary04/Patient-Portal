import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RegisterUser, LoginUser, UserDemographic, UserMedicationsAllergies } from '../shared/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_URL_USERS = 'http://127.0.0.1:3000/users';
  private API_URL_DEMOGRAPHICS = 'http://127.0.0.1:3000/demographics';
  private API_URL_MEDICATIONS_ALLERGIES = 'http://127.0.0.1:3000/medication-allergies'


  private allUsers$: BehaviorSubject<RegisterUser[]> = new BehaviorSubject<RegisterUser[]>([]);
  private unAuthUsers$: BehaviorSubject<RegisterUser[]> = new BehaviorSubject<RegisterUser[]>([]);

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



  constructor(private http: HttpClient) { }

  fetchAllUsers(): void {
    this.http.get<RegisterUser[]>(`${this.API_URL_USERS}`).subscribe(users => {
      if (users) {
        this.allUsers$.next(users);
      }
    })
  }

  loginUser(loginUser: LoginUser) {
    const allUsers = this.allUsers$.getValue();
    const user = allUsers.filter(u => {
      return u.email == loginUser.email
    })[0]
    if (user) {
      if (user.isAuthenticated) {
        this.getDemographicData(user.id);
        return user
      }
    }
    return false
  }

  registerUser(registerUser: RegisterUser) {
    console.log("registerUser called ---> ",registerUser)
    this.http.post<RegisterUser>(`${this.API_URL_USERS}`, registerUser).subscribe(user => {
      if (user) {
        const users = this.allUsers$.getValue();
        this.allUsers$.next(users.concat(user));
        this.createUserDemographic(user);
      }
    })
  }

  authenticateUser(registeredUser: RegisterUser) {
    this.http.put<RegisterUser>(`${this.API_URL_USERS}/${registeredUser.id}`, { ...registeredUser, "isAuthenticated": true }).subscribe(value => {
      if (value) {
        const users = this.allUsers$.getValue();
        const updatedUser = users.filter(user => user.id !== value.id)
        this.allUsers$.next(users.concat(updatedUser));
        this.unAuthenticatedUsers();
      }
    })
  }

  unAuthenticatedUsers() {
    const users = this.allUsers$.getValue();
    const unAuthUsers = users.filter(u =>  u.isAuthenticated == false )
    this.unAuthUsers$.next(unAuthUsers);
  }


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

  getDemographicData(userid: number|undefined){
    this.http.get<UserDemographic[]>(`${this.API_URL_DEMOGRAPHICS}`).subscribe(demoUsers => {
      if (demoUsers){
        const demoUserData = demoUsers.filter(u => u.userid == userid)[0];
        this.userDemographic$.next(demoUserData);
      }
    })
  }

  getAllDemographicsData():Observable<any>{
    return this.http.get(`${this.API_URL_DEMOGRAPHICS}`)
  }

  addDemographicData(userdata:UserDemographic):Observable<any>{
    return this.http.post(`${this.API_URL_DEMOGRAPHICS}`, userdata)
  }

  // updateDemographicData(userData:UserDemographic):Observable<any>{
  //   return this.http.post(`${this.API_URL_DEMOGRAPHICS}`, userData)
  // }

  getMedictionsData():Observable<any>{
    return this.http.get(`${this.API_URL_MEDICATIONS_ALLERGIES}`)
  }

  addMedicationsData(userData:UserMedicationsAllergies):Observable<any>{
    return this.http.post(`${this.API_URL_MEDICATIONS_ALLERGIES}`, userData)
  }
}

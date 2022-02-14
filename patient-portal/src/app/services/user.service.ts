import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RegisterUser, LoginUser, UserDemographic, UserMedicationsAllergies } from '../shared/interfaces/user';
import { DemographicService } from './demographic.service';
import { ReportService } from './report.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_URL_USERS = 'http://127.0.0.1:3000';


  private allUsers$: BehaviorSubject<RegisterUser[]> = new BehaviorSubject<RegisterUser[]>([]);
  private unAuthUsers$: BehaviorSubject<RegisterUser[]> = new BehaviorSubject<RegisterUser[]>([]);
  private token$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private loggedInUser$: BehaviorSubject<RegisterUser> = new BehaviorSubject<RegisterUser>({
    id: 0,
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    role: "",
    dob: "",
    mobile: "",
    password: "",
    isAuthenticated: false
  })


  constructor(private http: HttpClient, private demoService: DemographicService, private reportService: ReportService) { }

  fetchAllUsers(): void {
    this.http.get<RegisterUser[]>(`${this.API_URL_USERS}/users`).subscribe(users => {
      if (users) {
        this.allUsers$.next(users);
      }
    })
  }

  loginUser(loginUser: any) {
    const allUsers = this.allUsers$.getValue();
    const user = allUsers.filter(u => {
      return u.userName === loginUser.userName && u.password === loginUser.password;
    })[0]
    if (user) {
      if (user.isAuthenticated) {
        this.http.post<LoginUser>(`${this.API_URL_USERS}/login`, { email: loginUser.email, password: loginUser.password }).subscribe(res => {
          this.token$.next(res.accessToken)
          this.loggedInUser$.next(res.user);
          if (res.user.role == "patient") {
            this.demoService.fetchDemographicData(user.id);
          }
          this.reportService.fetchAllReports();
          this.unAuthenticatedUsers();
          const { password, isAuthenticated, mobile, dob, ...rest } = res.user
          sessionStorage.setItem("user", JSON.stringify(rest))
        })


        // ,err=>{
        //   console.log(12345);

        //   return new Error("Server error")

        // })
      }
    }

    // return new Promise(res => {
    //   res("Not processed")
    // })
  }

  registerUser(registerUser: RegisterUser) {
    this.http.post<RegisterUser>(`${this.API_URL_USERS}`, registerUser).subscribe(user => {
      if (user) {
        const users = this.allUsers$.getValue();
        this.allUsers$.next(users.concat(user));
        this.demoService.createUserDemographic(user);
      }
    })
  }

  deleteUser(id: number | undefined) {
    this.http.delete<RegisterUser>(`${this.API_URL_USERS}/users/${id}`).subscribe(user => {
      const users = this.allUsers$.getValue();
      const updatedUsers = users.filter(u => u.id !== id)
      this.allUsers$.next(updatedUsers);
      this.unAuthenticatedUsers();
    })
  }

  authenticateUser(registeredUser: RegisterUser) {
    this.http.put<RegisterUser>(`${this.API_URL_USERS}/660/users/${registeredUser.id}`, { ...registeredUser, "isAuthenticated": true }).subscribe(value => {
      if (value) {
        const users = this.allUsers$.getValue();
        const updatedUsers = users.filter(user => user.id !== value.id)
        this.allUsers$.next(updatedUsers.concat(value));
        this.unAuthenticatedUsers();
      }
    })
  }

  unAuthenticatedUsers() {
    const users = this.allUsers$.getValue();
    const unAuthUsers = users.filter(u => u.isAuthenticated == false)
    this.unAuthUsers$.next(unAuthUsers);
  }

  getUnAuthusers() {
    return this.unAuthUsers$.asObservable();
  }

  getUsers() {
    return this.allUsers$.asObservable();
  }

  getToken() {
    return this.token$.asObservable();
  }

  checkLoggedInUser() {
    const user = sessionStorage.getItem("user");
    if (user) {
      this.loggedInUser$.next(JSON.parse(user))
    }
  }

  getLoggedInUser(){
    return this.loggedInUser$.asObservable();
  }
}


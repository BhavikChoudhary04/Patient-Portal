import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';
import { RegisterUser, LoginUser, UserDemographic, UserMedicationsAllergies } from '../shared/interfaces/user';
import { SnackbarComponent } from '../shared/snackbar/snackbar.component';
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
  private user:RegisterUser = {
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
}


  constructor(private http: HttpClient, private demoService: DemographicService, private snackBar: MatSnackBar) { }
  

  async fetchAllUsers(): Promise<void> {
    
    const users = await this.http.get<RegisterUser[]>(`${this.API_URL_USERS}/users`).toPromise();
      if (users.length) {
        this.allUsers$.next(users);
        this.unAuthenticatedUsers();
      } else {
        this.snackBar.openFromComponent(SnackbarComponent, {
          data: {
            message: `Server error. Please try again.`,
            btn: "OK",
            action: ""
          }
        });
      }
  }

  async loginUser(loginUser: any) {
try {
    const users = await this.http.get<RegisterUser[]>(`${this.API_URL_USERS}/users?userName=${loginUser.userName}`).toPromise();
      if (users.length) {
        this.loggedInUser$.next(users[0]);
        this.user = users[0]
        if (this.user.id && this.user.id > 0) {
          if (this.user.isAuthenticated) {
            this.http.post<LoginUser>(`${this.API_URL_USERS}/login`, { email: this.user.email, password: loginUser.password }).subscribe(res => {
              this.token$.next(res.accessToken)
              this.loggedInUser$.next(res.user);
              const { password, isAuthenticated, mobile, dob, ...rest } = res.user
              sessionStorage.setItem("user", JSON.stringify(rest))
            })
          }
        }
      }
    } catch (err){
      this.snackBar.openFromComponent(SnackbarComponent, {
        data: {
          message: `Server error. Please try again.`,
          btn: "OK",
          action: ""
        }
      });
    }
    
  }

  async registerUser(registerUser: RegisterUser) {
    try {
    const user = await this.http.post<RegisterUser>(`${this.API_URL_USERS}/users`, registerUser).toPromise()
    // .subscribe(user => {
      
      if (user) {
        const users = this.allUsers$.getValue();
        this.allUsers$.next(users.concat(user));
        this.demoService.createUserDemographic(user);
      }
    } catch (err){
      this.snackBar.openFromComponent(SnackbarComponent, {
        data: {
          message: `Server error. Please try again.`,
          btn: "OK",
          action: ""
        }
      });
    }
    // })
  }

  async deleteUser(id: number | undefined) {
    try {
    await this.http.delete<RegisterUser>(`${this.API_URL_USERS}/users/${id}`).toPromise();
    const user = await this.http.get<RegisterUser[]>(`${this.API_URL_USERS}/users?id=${id}`).toPromise();
      if (user.length){
        this.snackBar.openFromComponent(SnackbarComponent, {
          data: {
            message: `Server error. Please try again.`,
            btn: "OK",
            action: ""
          }
        });
      }else {
        const users = this.allUsers$.getValue();
        const updatedUsers = users.filter(u => u.id !== id)
        this.allUsers$.next(updatedUsers);
        this.unAuthenticatedUsers();
        this.snackBar.openFromComponent(SnackbarComponent, {
          data: {
            message: `User deleted.`,
            btn: "OK",
            action: ""
          }
        });
      }
    } catch (err){
      this.snackBar.openFromComponent(SnackbarComponent, {
        data: {
          message: `Server error. Please try again.`,
          btn: "OK",
          action: ""
        }
      });
    }
  }

  async authenticateUser(registeredUser: RegisterUser) {
    try {
    const value = await this.http.put<RegisterUser>(`${this.API_URL_USERS}/660/users/${registeredUser.id}`, { ...registeredUser, "isAuthenticated": true }).toPromise();
      if (value) {
        const users = this.allUsers$.getValue();
        const updatedUsers = users.filter(user => user.id !== value.id)
        this.allUsers$.next(updatedUsers.concat(value));
        this.unAuthenticatedUsers();
      } else {
        this.snackBar.openFromComponent(SnackbarComponent, {
          data: {
            message: `Server error. Please try again.`,
            btn: "OK",
            action: ""
          }
        });
      }
    } catch (err){
      this.snackBar.openFromComponent(SnackbarComponent, {
        data: {
          message: `Server error. Please try again.`,
          btn: "OK",
          action: ""
        }
      });
    }
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


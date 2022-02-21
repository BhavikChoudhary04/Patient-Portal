import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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
  private user: RegisterUser = {
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


  constructor(private http: HttpClient, private demoService: DemographicService, private snackBar: MatSnackBar, private router: Router) { }


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
            try {
              const logInUser = await this.http.post<LoginUser>(`${this.API_URL_USERS}/login`, { email: this.user.email, password: loginUser.password }).toPromise();
              // .subscribe(res => {
              this.token$.next(logInUser.accessToken)
              this.loggedInUser$.next(logInUser.user);
              const { password, isAuthenticated, mobile, dob, ...rest } = logInUser.user
              sessionStorage.setItem("user", JSON.stringify(rest))
              if (logInUser.user.role === "admin") {
                this.router.navigateByUrl('/admin/dashboard')
              }
              else if (logInUser.user.role === "patient") {
                this.router.navigateByUrl('/patient/dashboard')
              }
              else if (logInUser.user.role === "physician") {
                this.router.navigateByUrl('/physician/dashboard')
              }
            } catch (err) {
              this.snackBar.openFromComponent(SnackbarComponent, {
                data: {
                  message: `Incorrect password.`,
                  btn: "OK",
                  action: ""
                }
              });
            }
          } else {
            this.snackBar.openFromComponent(SnackbarComponent, {
              data: {
                message: `User is not authenticated.`,
                btn: "OK",
                action: ""
              }
            });
          }
        }
      } else {
        this.snackBar.openFromComponent(SnackbarComponent, {
          data: {
            message: `User does not exist.`,
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

  async registerUser(registerUser: RegisterUser) {
    try {
      const usersName = await this.http.get<RegisterUser[]>(`${this.API_URL_USERS}/users?userName=${registerUser.userName}`).toPromise();
      if (usersName.length) {
        this.snackBar.openFromComponent(SnackbarComponent, {
          data: {
            message: `Choose a different username.`,
            btn: "OK",
            action: ""
          }
        });
        return
      }

      const usersMail = await this.http.get<RegisterUser[]>(`${this.API_URL_USERS}/users?email=${registerUser.email}`).toPromise();
      if (usersMail.length) {
        this.snackBar.openFromComponent(SnackbarComponent, {
          data: {
            message: `Email address already registered.`,
            btn: "OK",
            action: ""
          }
        });
        return
      }

      const user = await this.http.post<RegisterUser>(`${this.API_URL_USERS}/users`, registerUser).toPromise()
      // .subscribe(user => {

      if (user) {
        const users = this.allUsers$.getValue();
        this.allUsers$.next(users.concat(user));
        this.loggedInUser$.next(user)
        this.demoService.createUserDemographic(user);
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
    // })
  }

  async deleteUser(id: number | undefined) {
    try {
      await this.http.delete<RegisterUser>(`${this.API_URL_USERS}/users/${id}`).toPromise();
      const user = await this.http.get<RegisterUser[]>(`${this.API_URL_USERS}/users?id=${id}`).toPromise();
      if (user.length) {
        this.snackBar.openFromComponent(SnackbarComponent, {
          data: {
            message: `Server error. Please try again.`,
            btn: "OK",
            action: ""
          }
        });
      } else {
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

  async checkResetUser(email: string) {
    try {
      const usersMail = await this.http.get<RegisterUser[]>(`${this.API_URL_USERS}/users?email=${email}`).toPromise();
      if (!usersMail.length) {
        this.snackBar.openFromComponent(SnackbarComponent, {
          data: {
            message: `User not found.`,
            btn: "OK",
            action: ""
          }
        });
        return
      } else {
        this.snackBar.openFromComponent(SnackbarComponent, {
          data: {
            message: `Login credentials have been sent to you by mail.`,
            btn: "OK",
            action: ""
          }
        });
        return
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

  getLoggedInUser() {
    return this.loggedInUser$.asObservable();
  }

  updateUser(newUser: RegisterUser) {
    this.http.put<RegisterUser>(`${this.API_URL_USERS}/660/users/${newUser.id}`, newUser).subscribe(user => {
      const users = this.allUsers$.getValue();
      const updatedUser = users.filter(u => u.id === user.id)
      this.allUsers$.next(updatedUser)
    })
  }

  getUserDetail(id: number | undefined) {
    return this.http.get<RegisterUser>(`${this.API_URL_USERS}/660/users/${id}`)
  }
}


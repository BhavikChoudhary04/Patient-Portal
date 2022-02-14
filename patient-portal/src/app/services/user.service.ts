import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RegisterUser, LoginUser, UserDemographic, UserMedicationsAllergies } from '../shared/interfaces/user';
import { DemographicService } from './demographic.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_URL_USERS = 'http://127.0.0.1:3000/users';


  private allUsers$: BehaviorSubject<RegisterUser[]> = new BehaviorSubject<RegisterUser[]>([]);
  private unAuthUsers$: BehaviorSubject<RegisterUser[]> = new BehaviorSubject<RegisterUser[]>([]);

 
  constructor(private http: HttpClient, private demoService: DemographicService) { }

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
      return u.userName === loginUser.userName && u.password === loginUser.password;
    })[0]
    if (user) {
      if (user.isAuthenticated) {
        this.demoService.fetchDemographicData(user.id);
        this.unAuthenticatedUsers();
        return user
      }
    }
    return false
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

  deleteUser(id:number|undefined){
    this.http.delete<RegisterUser>(`${this.API_URL_USERS}/${id}`).subscribe(user => {
        const users = this.allUsers$.getValue();
        const updatedUsers = users.filter(u => u.id !== id)
        this.allUsers$.next(updatedUsers);
        this.unAuthenticatedUsers();
    })
  }

  authenticateUser(registeredUser: RegisterUser) {
    this.http.put<RegisterUser>(`${this.API_URL_USERS}/${registeredUser.id}`, { ...registeredUser, "isAuthenticated": true }).subscribe(value => {
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
    const unAuthUsers = users.filter(u =>  u.isAuthenticated == false )
    this.unAuthUsers$.next(unAuthUsers);
  }

  getUnAuthusers(){
    return this.unAuthUsers$.asObservable();
  }

  getUsers(){
    return this.allUsers$.asObservable();
  }

  getUsers(){
    return this.allUsers$.asObservable();
  }

}

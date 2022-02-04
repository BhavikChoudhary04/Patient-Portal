import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {RegisterUser, LoginUser} from '../shared/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_URL = 'http://127.0.0.1:3000/users'

  private allUsers$:BehaviorSubject<RegisterUser[]> = new BehaviorSubject<RegisterUser[]>([]);
  private unAuthUsers$:BehaviorSubject<RegisterUser[]> = new BehaviorSubject<RegisterUser[]>([]);


  constructor(private http: HttpClient) { }

  fetchAllUsers(): void {
    this.http.get<RegisterUser[]>(`${this.API_URL}`).subscribe(users => {
      if (users){
        this.allUsers$.next(users);
      }
    })
  }

  loginUser(loginUser:LoginUser){
    const allUsers = this.allUsers$.getValue();
    const userArr = allUsers.filter(u => {
      return u.email == loginUser.email
    })
    if (userArr.length){
      if (userArr[0].isAuthenticated){
        return true
      }
    }
    return false
  }

  registerUser(registerUser:RegisterUser){
    this.http.post<RegisterUser>(`${this.API_URL}`,registerUser).subscribe(user => {
      if (user){
        const users = this.allUsers$.getValue();
        this.allUsers$.next(users.concat(user));
      }
    })
  }

  authenticateUser(registeredUser:RegisterUser){
    this.http.put<RegisterUser>(`${this.API_URL}/${registeredUser.id}`,{...registeredUser,"isAuthenticated":true}).subscribe(value => {
      if(value){
      const users = this.allUsers$.getValue();
      const updatedUser = users.filter(user => user.id !== value.id)
      this.allUsers$.next(users.concat(updatedUser));
      this.unAuthenticatedUsers();
      }
      
    })
  }

  unAuthenticatedUsers(){
    const users = this.allUsers$.getValue();
    const unAuthUsers = users.filter(u => { u.isAuthenticated == false})
    this.unAuthUsers$.next(unAuthUsers);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserMedicationsAllergies } from '../shared/interfaces/user';


@Injectable({
  providedIn: 'root'
})
export class AllergyService {

  constructor(private http: HttpClient) { }

  private API_URL_MEDICATIONS_ALLERGIES = 'http://127.0.0.1:3000/medication-allergies';

  getMedictionsData():Observable<any>{
    return this.http.get(`${this.API_URL_MEDICATIONS_ALLERGIES}`)
  }

  addMedicationsData(userData:UserMedicationsAllergies):Observable<any>{
    return this.http.post(`${this.API_URL_MEDICATIONS_ALLERGIES}`, userData)
  }

}

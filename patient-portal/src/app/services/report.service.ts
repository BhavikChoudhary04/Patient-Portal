import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Report } from '../shared/interfaces/report'

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }

  private API_URL = 'http://127.0.0.1:3000'

  private allReports$:BehaviorSubject<Report[]> = new BehaviorSubject<Report[]>([]);
  private userReports$:BehaviorSubject<Report> = new BehaviorSubject<Report>({
    userId: 0,
    vitals: {
        bloodPressure: "",
        pulse: "",
        temperature: "",
        respiration: "",
        height: "",
        weight: ""
    },
    procedureCode: "",
    diagnosisCode: "",
    labReport: "",
    radiologyReport: "",
    medication: []
});


  fetchAllReports(){
    this.http.get<Report[]>(`${this.API_URL}/660/reports`).subscribe(reports => {
      if (reports){
        this.allReports$.next(reports);
      }
    })
  }

  reportByUser(userId:number){
    
    const reports = this.allReports$.getValue();
    const userReport = reports.filter(r => 
      r.userId == userId
    )[0]
    if (userReport){
      this.userReports$.next(userReport)
    }
  }

  editUserReport(report:Report,editedFields:any){
    this.http.put<Report>(`${this.API_URL}/660/reports/${report.userId}`,{...report,...editedFields}).subscribe(report => {
      if (report){
        const reports = this.allReports$.getValue();
      const updatedReport = reports.filter(r => r.userId !== report.userId)
      this.allReports$.next(reports.concat(updatedReport));
      this.reportByUser(report.userId);
      }
    })
  }

  createUserReport(report:Report){
      this.http.post<Report>(`${this.API_URL}/660/reports`,report).subscribe(report => {
        if (report){
          const reports = this.allReports$.getValue();
          const addReport = reports.concat(report)
          this.allReports$.next(addReport);
          this.reportByUser(report.userId);
        }
      })
  }

  getUserReport(){
    return this.userReports$.asObservable();
  }
}

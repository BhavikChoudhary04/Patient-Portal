import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { Report } from '../shared/interfaces/report'
import { SnackbarComponent } from '../shared/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient, private snackBar:MatSnackBar) { }

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


  // fetchAllReports(){
  //   this.http.get<Report[]>(`${this.API_URL}/660/reports`).subscribe(reports => {
  //     if (reports){
  //       this.allReports$.next(reports);
  //     }
  //   })
  // }

  async reportByUser(userId:number){
    try {
    const report = await this.http.get<Report[]>(`${this.API_URL}/660/reports?userId=${userId}`).toPromise();
      if (report){
        this.userReports$.next(report[0]);
      } else {
        // this.snackBar.openFromComponent(SnackbarComponent, {
        //   data: {
        //     message: `Server error. Please try again.`,
        //     btn: "OK",
        //     action: ""
        //   }
        // });
      }
    } catch(err) {
      // this.snackBar.openFromComponent(SnackbarComponent, {
      //   data: {
      //     message: `Server error. Please try again.`,
      //     btn: "OK",
      //     action: ""
      //   }
      // });
    }
  }

  async editUserReport(report:Report,editedFields:any){ 
    try {
    const rep = await this.http.put<Report>(`${this.API_URL}/660/reports/${report.id}`,{...report,...editedFields}).toPromise();
 
      if (rep){
        const reports = this.allReports$.getValue();
      const updatedReports = reports.filter(r => r.userId !== report.userId)
      this.allReports$.next(updatedReports.concat(rep));
      this.userReports$.next(rep);
      } else {
        this.snackBar.openFromComponent(SnackbarComponent, {
          data: {
            message: `Server error. Please try again.`,
            btn: "OK",
            action: ""
          }
        });
      }
    }catch (err){
      this.snackBar.openFromComponent(SnackbarComponent, {
        data: {
          message: `Server error. Please try again.`,
          btn: "OK",
          action: ""
        }
      });
    }
  }

  async createUserReport(report:Report){
    try {
      const rep = await this.http.post<Report>(`${this.API_URL}/660/reports`,report).toPromise();
        if (rep){
          const reports = this.allReports$.getValue();
          const addReport = reports.concat(rep)
          this.allReports$.next(addReport);
        } else {
          this.snackBar.openFromComponent(SnackbarComponent, {
            data: {
              message: `Server error. Please try again.`,
              btn: "OK",
              action: ""
            }
          });
        } 
      }catch (err){
        this.snackBar.openFromComponent(SnackbarComponent, {
          data: {
            message: `Server error. Please try again.`,
            btn: "OK",
            action: ""
          }
        });
      }
  }

  getUserReport(){
    return this.userReports$.asObservable();
  }
}

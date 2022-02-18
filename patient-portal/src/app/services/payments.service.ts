import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { Bill } from '../shared/interfaces/bill';
import { SnackbarComponent } from '../shared/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  private API_URL = 'http://127.0.0.1:3000';

  private bills$: BehaviorSubject<Bill[]> = new BehaviorSubject<Bill[]>([]);


  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  async fetchPaymentBills() {
    try {
      const bills = await this.http.get<Bill[]>(`${this.API_URL}/payment-history`).toPromise();

      if (bills.length) {
        this.bills$.next(bills)
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

  createPayment(){
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: {
        message: `Payment has been made successfully.`,
        btn: "OK",
        action: ""
      }
    });
  }

  getBills() {
    return this.bills$.asObservable();
  }
}

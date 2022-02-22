import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentsService } from 'src/app/services/payments.service';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {

  billingForm!:FormGroup;
  constructor(private fb:FormBuilder, private PaymentService: PaymentsService){
  }
  // ELEMENT_DATA: any = [
  //   {date: '08/12/2021', doctorsName: 'Stephen Randall', billAmount: 1079, paymentMethod: 'Credit Card'},
  //   {date: '20/09/2021', doctorsName: 'Chaz Webb', billAmount: 400, paymentMethod: 'Debit Card'},
  //   {date: '15/05/2021', doctorsName: 'Hana Bullock', billAmount: 641, paymentMethod: 'Debit Card'},
  //   {date: '13/10/2020', doctorsName: 'Lailah Goodman', billAmount: 922, paymentMethod: 'UPI'},
  //   {date: '19/04/2019', doctorsName: 'Tara Mcclain', billAmount: 111, paymentMethod: 'UPI'},
  //   {date: '07/03/2019', doctorsName: 'Jaqueline Tyler', billAmount: 1107, paymentMethod: 'Debit Card'},
  //   {date: '05/02/2019', doctorsName: 'Jaqueline Tyler', billAmount: 1067, paymentMethod: 'Net Banking'},
  //   {date: '30/01/2018', doctorsName: 'Madalynn Nixon', billAmount: 1994, paymentMethod: 'Credit Card'},
  //   {date: '23/01/2018', doctorsName: 'Madalynn Nixon', billAmount: 1984, paymentMethod: 'UPI'},
  //   {date: '01/05/2017', doctorsName: 'Gemma Burton', billAmount: 2097, paymentMethod: 'Credit Card'},
  // ];
  ELEMENT_DATA: any;


  // dataSource = this.ELEMENT_DATA;
  displayedColumns: string[] = ['invoiceNumber', 'procedureCode', 'amount', 'mode'];

  ngOnInit(): void {
    this.billingForm = this.fb.group({
      // occupation: ['', Validators.required],
    })    

    this.PaymentService.fetchPaymentBills();
    this.PaymentService.getBills().subscribe((data) => {
      this.ELEMENT_DATA = data;
      // dataSource = this.ELEMENT_DATA;
    });

    console.log(this.ELEMENT_DATA);
  }

  billAmount: number = 2143;

  createPayment(){
    this.PaymentService.createPayment();
  }

}

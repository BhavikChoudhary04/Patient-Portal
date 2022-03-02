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

  ELEMENT_DATA: any;


  
  displayedColumns: string[] = ['invoiceNumber', 'procedureCode', 'amount', 'mode'];

  ngOnInit(): void {
    this.billingForm = this.fb.group({
      // occupation: ['', Validators.required],
    })    

    this.PaymentService.fetchPaymentBills();
    this.PaymentService.getBills().subscribe((data) => {
      this.ELEMENT_DATA = data;
    });

    console.log(this.ELEMENT_DATA);
  }

  billAmount: number = 2143;

  createPayment(){
    this.PaymentService.createPayment();
  }

}

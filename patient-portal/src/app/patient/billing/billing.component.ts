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

  // Fetching historical data from Service
  ngOnInit(): void {
    this.billingForm = this.fb.group({
      // occupation: ['', Validators.required],
    })    
    this.PaymentService.fetchPaymentBills();
    this.PaymentService.getBills().subscribe((data) => {
      this.ELEMENT_DATA = data;
    });
  }


  // Creating randomly generated elements
  procedureList: string[] = ['00910ZZ', '005G4ZZ', '001U074', '001637A'];
  invoiceNumber = 'IN' + (1300000 + Math.floor(Math.random()*99999));
  procedureCode = this.procedureList[Math.floor(Math.random()*4)];
  doctorsFee = 50 + Math.floor(Math.random()*100);
  emergencyRoom = 30 + Math.floor(Math.random()*100);
  pharmacy = 20 + Math.floor(Math.random()*100);
  convenienceFee = Math.floor(Math.random()*100);
  billAmount: number = this.doctorsFee + this.emergencyRoom + this.pharmacy + this.convenienceFee;
  items = [{doctorsFee: this.doctorsFee, emergencyRoom: this.emergencyRoom, pharmacy: this.pharmacy, convenienceFee: this.convenienceFee, billAmount: this.billAmount}];


  createPayment(options:any){
    if(options.value===undefined)
      console.log("Please select a mode to pay");
    else
      this.PaymentService.createPayment();
  }

}

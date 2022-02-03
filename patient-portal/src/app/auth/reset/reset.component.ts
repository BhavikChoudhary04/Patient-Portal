import { Component, OnInit } from '@angular/core';
import { FormControl,Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
  
    emailId!:FormControl

  constructor(private router: Router, private snackBar:MatSnackBar) { 
    this.createResetForm();
  }

  ngOnInit(): void {
  }

  createResetForm(){
    this.emailId = new FormControl("", [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
    ]);
  }

  reset(){
    if (this.emailId.invalid) return
      this.snackBar.open("Credentials have been sent to you by SMS", "Back to login!");
      // this.router.navigateByUrl('/auth/login')
  }

}

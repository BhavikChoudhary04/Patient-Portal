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
  
    phnNumber!:FormControl

  constructor(private router: Router, private snackBar:MatSnackBar) { 
    this.createResetForm();
  }

  ngOnInit(): void {
  }

  createResetForm(){
    this.phnNumber = new FormControl("", [
      Validators.required, 
      Validators.minLength(10), 
      Validators.maxLength(10),
      Validators.pattern('^[6-9][0-9]+')
    ]);
  }

  reset(){
    if (this.phnNumber.errors) return
      this.snackBar.open("Credentials have been sent to you by SMS", "Back to login!");
      this.router.navigateByUrl('/auth/login')
  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl,Validators } from '@angular/forms';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarComponent } from 'src/app/shared/snackbar/snackbar.component';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

    data!:string|null
    emailId!:FormControl

  constructor(
    private router: Router, 
    private snackBar:MatSnackBar,
    private route:ActivatedRoute) { 

    this.createResetForm();
  }

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('data')
    if (param == 'username'){
      this.data = 'Username'
    } else if (param == 'password'){
      this.data = 'Password'
    } else {
      this.router.navigateByUrl('/auth/login')
    }
  }


  createResetForm(){
    this.emailId = new FormControl("", [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
    ]);
  }

  reset(e:Event){
    e.preventDefault();

    if (this.emailId.invalid) return

    this.snackBar.openFromComponent(SnackbarComponent,{
      data: {
        message : `${this.data} has been sent to you by mail`,
        btn: "OK",
        action: "reset"
      }
    });

  }

}

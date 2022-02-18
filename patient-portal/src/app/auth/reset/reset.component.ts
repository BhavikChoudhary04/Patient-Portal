import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl,Validators } from '@angular/forms';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarComponent } from 'src/app/shared/snackbar/snackbar.component';
import { RegisterUser } from 'src/app/shared/interfaces/user';
import { UserService } from 'src/app/services/user.service';

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
    private route:ActivatedRoute,
    private userService: UserService) {

    this.createResetForm();
  }

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('data')
    if (param == 'username'){
      this.data = 'Username'
    } else if (param == 'password'){
      this.data = 'Password'
    } else {
      this.router.navigateByUrl('/login')
    }
  }

  createResetForm(){
    this.emailId = new FormControl("", [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
    ]);
  }

  backToLogin(){
    this.router.navigateByUrl('/auth/login')
  }

  reset(e:Event){
    e.preventDefault();

    if (this.emailId.invalid) return

    let allregisteredUser:RegisterUser[];

    //get all registered user list
    this.userService.getUsers().subscribe(data=> {
      allregisteredUser = data;
    });

     //check is user exist
    let checkIsUserExist:any = allregisteredUser !.filter(u => {
      return u.email === this.emailId.value
    })[0]

    let message:string = '';

    if(checkIsUserExist){
        message = `${this.data} has been sent to you by mail`;
    }else{
      message = `We can't find a user with that e-mail address`;
    }


    this.snackBar.openFromComponent(SnackbarComponent,{
      data: {
        message : message,
        btn: "OK",
        action: message === `${this.data} has been sent to you by mail` ? "reset" : ''
      }
    });

  }

}

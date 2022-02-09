import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { LoginUser, RegisterUser } from 'src/app/shared/interfaces/user';
import { SnackbarComponent } from 'src/app/shared/snackbar/snackbar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm !: FormGroup;
  flag: boolean = true;

  constructor(private fb: FormBuilder, 
    private userService: UserService, 
    private snackBar: MatSnackBar, 
    private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: [null, Validators.required],
      password: [null, [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
    });
  }


  loginDetails() {
    const user:LoginUser = this.loginForm.value

    let allregisteredUser:RegisterUser[];

    // get all registred users
    this.userService.getUsers().subscribe(data=> {
      allregisteredUser = data;
    });

    //check is user exist
    let checkIsUserExist:any = allregisteredUser !.filter(u => {
      return u.userName === user.userName ;
    })[0]

    let message:string = '';
    //validation for user login
    if(checkIsUserExist === undefined){
      message = 'No user found. Please create an account.';
    }else if(checkIsUserExist!.password != user.password){
      message = 'You have entered an invalid username or password';
    }else if(checkIsUserExist.isAuthenticated == false){
      message = 'User not authenticated yet. Please try again later';
    }

    if(message!=''){
      this.snackBar.openFromComponent(SnackbarComponent,{
        data: {
          message : message,
          btn: "OK",
          action: "reset"
        }
      });
      return
    }

    const loggedInUser:any = this.userService.loginUser(user);

    if (loggedInUser){
      const { id, password, isAuthenticated, mobile, dob, ...rest } = loggedInUser
      sessionStorage.setItem("user",JSON.stringify(rest))

      // navigate according to role
      if (loggedInUser.role === "admin"){
        this.router.navigateByUrl('/admin/dashboard')
      }
      else if (loggedInUser.role === "patient"){
        console.log("In patient ")
        this.router.navigateByUrl('/patient/dashboard')
      } 
      else if (loggedInUser.role === "physician"){
        this.router.navigateByUrl('/physician/dashboard')
      }
    }
  }

}

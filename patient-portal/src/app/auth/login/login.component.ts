import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { LoginUser } from 'src/app/shared/interfaces/user';
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
      email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: [null, [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
    });
  }


  loginDetails() {
    const user:LoginUser = this.loginForm.value

    const loggedInUser = this.userService.loginUser(user);

    if (loggedInUser){

      console.log("Before loggedInUser---> ",loggedInUser);

      const { id, password, isAuthenticated, mobile, dob, ...rest } = loggedInUser
      sessionStorage.setItem("user",JSON.stringify(rest))

      console.log("After loggedInUser---> ",loggedInUser);

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
      else {
        this.snackBar.openFromComponent(SnackbarComponent,{
          data: {
            message : `Invalid user. Retry login.`,
            btn: "OK",
            action: "reset"
          }
        });
      }
      
    } else {
      this.snackBar.openFromComponent(SnackbarComponent,{
        data: {
          message : `User is either not authenticated or does not exist.`,
          btn: "OK",
          action: "reset"
        }
      });
    }
  }

}

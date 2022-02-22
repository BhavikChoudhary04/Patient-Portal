import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { LoginUser, RegisterUser } from 'src/app/shared/interfaces/user';
import { SnackbarComponent } from 'src/app/shared/snackbar/snackbar.component';
// import { jwt } from 'jsonwebtoken';

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
    const user: LoginUser = this.loginForm.value

    this.userService.loginUser(user)
  
  }

}

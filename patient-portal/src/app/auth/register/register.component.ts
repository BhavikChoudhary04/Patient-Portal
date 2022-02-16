import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { RegisterUser } from 'src/app/shared/interfaces/user';
import { DateAdapter } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/app/shared/snackbar/snackbar.component';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})

export class RegisterComponent implements OnInit {

  registerForm!: FormGroup
  flag: boolean = true;
  CPflag: boolean = true;
  minDate! : any;
  maxDate! : any;
  
  constructor(
    private fb:FormBuilder,
    private router:Router,
    private userService: UserService,
    private datePipe: DatePipe,
    private dateAdapter: DateAdapter<Date>,
    private snackBar:MatSnackBar
    ) {
      this.dateAdapter.setLocale('en-GB');
      this.createRegisterForm();
      //setting minDate for DOB i.e 120 years old
      this.minDate = new Date ();
      this.minDate.setFullYear(this.minDate.getFullYear() -120);
      //setting max Date as today's date for DOB
      this.maxDate =  new Date();
    }

  ngOnInit() {

  } 

  confirmedValidator(controlName: string, matchingControlName: string){
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ confirmedValidator: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}

  createRegisterForm(){
    this.registerForm = this.fb.group({
      firstName : ['', [Validators.required,Validators.maxLength(20), Validators.pattern('^[a-zA-Z ]*$')]],
      lastName : ['', [Validators.required,Validators.maxLength(20), Validators.pattern('^[a-zA-Z ]*$')]],
      dob : ['', Validators.required],
      userName : ['', [Validators.required,  Validators.pattern('^[A-Za-z0-9_]{3,12}$')]],
      role : ['', Validators.required],
      email : ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      mobile : ['', [Validators.required, Validators.minLength(10), 
                     Validators.maxLength(10),Validators.pattern("^[6-9][0-9]+")]],
                    // number starting from 6-9 and containing 10 digits
      password : ['', [Validators.required, Validators.minLength(8), 
                       Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
                      // Minimum eight characters, at least one upercase letter, one lowercase letter, one special character and one number
      confirmPassword : ['', [Validators.required, Validators.minLength(8), 
                               Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]]
                      // Minimum eight characters, at least one upercase letter, one lowercase letter, one special character and one number

    },{ 
      validator: this.confirmedValidator('password', 'confirmPassword')
    })
  }

  submitRegisterForm(){
    if (this.registerForm.invalid) return

    let userDetails = this.registerForm.value;
    let allregisteredUser:RegisterUser[];

    //get all registered user list
    this.userService.getUsers().subscribe(data=> {
      allregisteredUser = data;
    });

     //check is user exist
    let checkIsUserExist:any = allregisteredUser !.filter(u => {
      return u.userName === userDetails.userName || u.email === userDetails.email;
    })[0]

    let message:string = '';
    let registerMessage = 'User has been registered successfully';
    //validation for user login
    if(checkIsUserExist){
      if(checkIsUserExist.userName === userDetails.userName){
        message = 'Someone already has that username. Try another?';
      }else if(checkIsUserExist.email === userDetails.email){
        message = 'This email is already associated with an account.';
      }else if(checkIsUserExist.isAuthenticated == false){
        message = 'User not authenticated yet. Please try again later';
      }
    }else{
      message = registerMessage;
    }

    if(message == registerMessage){
      // modified DOB in dd-mm-yyyy format
      userDetails.dob = this.datePipe.transform(userDetails.dob, 'dd-MM-yyyy');

      //remove confirmPassword and add isAuthenticated
      const {confirmPassword,...rest} = userDetails;
      const user:RegisterUser = {...rest, isAuthenticated:false}
      this.userService.registerUser(user);
    }

    this.snackBar.openFromComponent(SnackbarComponent,{
      data: {
        message : message,
        btn: "OK",
        action: message === registerMessage ? "reset" : ''
      }
    });
  }

  backToLogin(){
    this.router.navigateByUrl('/login');
  }

}

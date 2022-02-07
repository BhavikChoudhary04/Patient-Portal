import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { RegisterUser } from 'src/app/shared/interfaces/user';
import * as moment from 'moment';

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
    private datePipe: DatePipe
    ) {
      this.createRegisterForm();
      //set minDate for DOB i.e 120 years old
      this.minDate = new Date ();
      this.minDate.setFullYear(this.minDate.getFullYear() -120);


      

      this.maxDate =  new Date();
      
      //this.maxDate.setFullYear(this.maxDate.getFullYear() -120);

      console.log("this.maxDate--->",this.maxDate);
      
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
      dob : ['', [ Validators.required]],
      userName : ['', Validators.required],
      role : ['', Validators.required],
      email : ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      // email : new FormControl('',[Validators.required, Validators.email]),
      // mobile : ['', [Validators.required, Validators.minLength(10), 
      //               Validators.maxLength(10),Validators.pattern("^((\\+91-?)|7)?[0-9]{10}$")]],
      mobile : ['', [Validators.required, Validators.minLength(10), 
                     Validators.maxLength(10),Validators.pattern("^[6-9][0-9]+")],
                     Validators.maxLength(10)],
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
    this.registerForm.value.dob = this.datePipe.transform(this.registerForm.value.dob, 'dd-MM-yyyy');
    //remove confirmPassword and add isAuthenticated
    const {confirmPassword,...rest} = this.registerForm.value
    const user:RegisterUser = {...rest, isAuthenticated:false}

    this.userService.registerUser(user)
    this.router.navigateByUrl('/auth/login')
  }

}

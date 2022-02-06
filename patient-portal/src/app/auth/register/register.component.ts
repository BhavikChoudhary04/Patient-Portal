import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { Router } from '@angular/router';

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

  constructor(
    private fb:FormBuilder,
    private router:Router,
    private datePipe: DatePipe
    ) {
      this.createRegisterForm();
     }

  ngOnInit(): void {
  }

  createRegisterForm(){
    this.registerForm = this.fb.group({
      firstName : ['', [Validators.required,Validators.maxLength(20), Validators.pattern('^[a-zA-Z ]*$')]],
      lastName : ['', [Validators.required,Validators.maxLength(20), Validators.pattern('^[a-zA-Z ]*$')]],
      dob : ['', Validators.required],
      userName : ['', Validators.required],
      role : ['', Validators.required],
      email : ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      // email : new FormControl('',[Validators.required, Validators.email]),
      // mobile : ['', [Validators.required, Validators.minLength(10), 
      //               Validators.maxLength(10),Validators.pattern("^((\\+91-?)|7)?[0-9]{10}$")]],
      mobile : ['', [Validators.required, Validators.minLength(10), 
                     Validators.maxLength(10),Validators.pattern("^[6-9][0-9]+")]],
                    // number starting from 6-9 and containing 10 digits
      password : ['', [Validators.required, Validators.minLength(8), 
                       Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
                      // Minimum eight characters, at least one upercase letter, one lowercase letter, one special character and one number
      confirmPassword : ['', [Validators.required, Validators.minLength(8), 
                               Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]]
                      // Minimum eight characters, at least one upercase letter, one lowercase letter, one special character and one number

    })
  }

  submitRegisterForm(){
    if (this.registerForm.invalid) return
      this.router.navigateByUrl('/auth/login');
      this.registerForm.value.dob = this.datePipe.transform(this.registerForm.value.dob, 'dd-MM-yyyy');
      //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
      console.log(this.registerForm.value);
    }

}

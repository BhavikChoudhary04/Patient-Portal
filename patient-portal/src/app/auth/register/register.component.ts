import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup
  flag: boolean = true;
  CPflag: boolean = true;

  constructor(
    private fb:FormBuilder,
    private router:Router
    ) {
      this.createRegisterForm();
     }

  ngOnInit(): void {
  }

  createRegisterForm(){
    this.registerForm = this.fb.group({
      firstName : ['', Validators.required],
      lastName : ['', Validators.required],
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
      // console.log(this.registerForm.value);
  }

}

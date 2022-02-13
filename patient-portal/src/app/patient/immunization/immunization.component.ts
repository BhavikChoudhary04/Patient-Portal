import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-immunization',
  templateUrl: './immunization.component.html',
  styleUrls: ['./immunization.component.css']
})
export class ImmunizationComponent implements OnInit {

  loginForm !: FormGroup;
  flag: boolean = true;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      vaccineName: [null, [Validators.required]],
      // vaccineName: [null],
      vaccineNumberOfDoses: [null],
      dateOfLastVaccine: [null],
      anyOtherVaccines: [null]
    });
  }

  loginDetails(formData:any) {
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(formData.value, null, 4));
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-vitals',
  templateUrl: './vitals.component.html',
  styleUrls: ['./vitals.component.css']
})
export class VitalsComponent implements OnInit {

  patientVitalsForm !: FormGroup;
  flag: boolean = true;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.patientVitalsForm = this.fb.group({
      // vaccineName: [null, [Validators.required]],
      // vaccineName: [null],
      bloodPressure: [null, [Validators.required]],
      pulse: [null, [Validators.required]],
      temperature: [null, [Validators.required]],
      respiration: [null, [Validators.required]],
      height: [null, [Validators.required]],
      weight: [null, [Validators.required]],
      procedureCode: [null, [Validators.required]],
      diagnosisCode: [null, [Validators.required]],
      labReport: [null, [Validators.required]],
      radiologyReports: [null, [Validators.required]],
      medication: [null, [Validators.required]]
    });
  }

}

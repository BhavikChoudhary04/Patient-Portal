import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DemographicService } from 'src/app/services/demographic.service';
import { UserDemographic } from 'src/app/shared/interfaces/user';

@Component({
  selector: 'app-demographics-dialog',
  templateUrl: './demographics-dialog.component.html',
  styleUrls: ['./demographics-dialog.component.css']
})
export class DemographicsDialogComponent implements OnInit {

  demographicsForm!:FormGroup;
  allEthnicityOptions:any=[
    { value : "American"},
    { value :"African"},
    { value: "Asian"}
  ];
  allDemographicsData?:UserDemographic[]
  userDemographicData?:UserDemographic

  hideInput:boolean = true


  constructor(
    private fb:FormBuilder,
    private demoService:DemographicService,
    public dialogRef:MatDialogRef<DemographicsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserDemographic
  ) {console.log(data);}

  ngOnInit(): void {
    this.demographicsForm = this.fb.group({
      ethnicity:['American', Validators.required],
      education: ['',Validators.required],
      occupation: ['', Validators.required],
      address: ['', Validators.required],
      mobile: ['', Validators.required],
      medicalHistory: ['', Validators.required],
      familymedicalhistory: [''],
      surgeries: [''],
      insuranceProvider: ['', Validators.required]
    })
    this.setDemoForm()
    console.log(this.data);
    
  }

  setDemoForm(){
    this.demographicsForm.setValue({
      ethnicity : this.data.ethnicity,
      education : this.data.education,
      occupation : this.data.occupation,
      address : this.data.address,
      mobile : this.data.mobile,
      medicalHistory : this.data.medicalHistory,
      familymedicalhistory : this.data.familymedicalhistory,
      surgeries : this.data.surgeries,
      insuranceProvider : this.data.insuranceProvider
    })
  }


  onDialogClose(){
    this.dialogRef.close()
  }


}

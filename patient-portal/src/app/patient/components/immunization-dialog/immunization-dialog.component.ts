import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DemographicService } from 'src/app/services/demographic.service';
import { UserDemographic } from 'src/app/shared/interfaces/user';

@Component({
  selector: 'app-immunization-dialog',
  templateUrl: './immunization-dialog.component.html',
  styleUrls: ['./immunization-dialog.component.css']
})

export class ImmunizationDialogComponent implements OnInit {

  demographicsForm!:FormGroup;
  dosesOptions:any=[
    { value : "1"},
    { value :"2"}
  ];
  allDemographicsData?:UserDemographic[]
  userDemographicData?:UserDemographic

  hideInput:boolean = true


  constructor(
    private fb:FormBuilder,
    private demoService:DemographicService,
    public dialogRef:MatDialogRef<ImmunizationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserDemographic
  ) {console.log(data);}

  ngOnInit(): void {
    this.demographicsForm = this.fb.group({
      // firstName: ['', [Validators.required]],
      vaccineName: ['',Validators.required],
      vaccineNumberOfDoses: [''],
      dateOfLastVaccine: [''],
      anyOtherVaccines: [''],
      // surgeries: [''],
    })
    this.getDemographicsData()
    
    
  }

  onSubmitClick(formdata:any){
    alert(`Demographics Form data: ${JSON.stringify(formdata.value)}`)
    this.userDemographicData = this.demographicsForm.value
    if (this.userDemographicData){
      this.addDemographicData(this.userDemographicData)
    }
  }

  addDemographicData(userData:UserDemographic){
    this.demoService.editDemographicData(userData)
    console.log('pattient demographic data submitted, new userdata:', userData);
  }

  getDemographicsData (){
    this.demoService.getAllDemographicsData().subscribe((dataDemographics)=>{
      if(dataDemographics){
        this.allDemographicsData = dataDemographics
        console.log('allDemographicsData: ', this.allDemographicsData);
      }
    })
  }

  // updateDemographicData(userData:UserDemographic){
  //   this.userService.updateDemographicData(userData).subscribe(data => {
  //     if(data){
  //       const updatedUserData = data
  //       console.log('updated demographics data: ', updatedUserData);
  //     }
  //   })
  // }

  onDialogClose(){
    this.dialogRef.close()
  }


}

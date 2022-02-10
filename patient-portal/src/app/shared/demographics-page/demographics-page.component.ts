import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { DemographicService } from 'src/app/services/demographic.service';
import { UserService } from 'src/app/services/user.service';
import { UserDemographic } from '../interfaces/user';

@Component({
  selector: 'app-demographics-page',
  templateUrl: './demographics-page.component.html',
  styleUrls: ['./demographics-page.component.css']
})
export class DemographicsPageComponent implements OnInit {

  demographicsForm!:FormGroup;
  allEthnicityOptions:any=[
    { value : "American"},
    { value :"African"},
    { value: "Asian"}
  ];
  allDemographicsData?:UserDemographic[]
  userDemographicData?:UserDemographic

  constructor(private fb:FormBuilder, private demoService:DemographicService) {}

  ngOnInit(): void {
    this.demographicsForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['Male',Validators.required],
      ethnicity:['American', Validators.required],
      education: ['',Validators.required],
      occupation: ['', Validators.required],
      address: ['', Validators.required],
      mobile: ['', Validators.required],
      medicalHistory: ['', Validators.required],
      familymedicalHistory: [''],
      surgeries: [''],
      insuranceProviders: ['', Validators.required]
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
}

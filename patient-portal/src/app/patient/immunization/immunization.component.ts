import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DemographicService } from 'src/app/services/demographic.service';
import { ImmunizationDialogComponent } from '../components/immunization-dialog/immunization-dialog.component';

@Component({
  selector: 'app-immunization',
  templateUrl: './immunization.component.html',
  styleUrls: ['./immunization.component.css']
})

export class ImmunizationComponent implements OnInit {

  showDemographicDetails: boolean = false
  userDetailFields:[{vaccineName:string, vaccineNumberOfDoses: string, dateOfLastVaccine: string, anyOtherVaccines: string}]= [
    {
      vaccineName: 'Covishield',
      vaccineNumberOfDoses: '2',
      dateOfLastVaccine: '28/09/2021',
      anyOtherVaccines: 'nil'
    }
  ]
  userDemographicsValues:[{ethnicity:string, education: string, occupation: string, address: string, mobile: string, medicalHistory: string, familymedicalHistory: string, surgeries: string, insuranceProviders: string}] = [
    {
      ethnicity:'',
      education: '',
      occupation: '',
      address: '',
      mobile: '',
      medicalHistory: '',
      familymedicalHistory: '',
      surgeries: '',
      insuranceProviders: '',
    }
  ]

  constructor(private fb:FormBuilder, private demoService:DemographicService, public dialog: MatDialog) {}

  ngOnInit(): void {
  }
  openEditDemoDialog(): void{
    const dialogRef = this.dialog.open(ImmunizationDialogComponent, {
      width: '60%',
      data: this.userDetailFields[0]
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log('the edit demographic dialog was closed');
      const newDetails = result
      console.log('new patient demographics details: ', result);
      if (result){
        this.userDemographicsValues[0] = result
        console.log('userDemographicsValues', this.userDemographicsValues[0]);
        this.showDemographicDetails = true
      }
    })
  }
}
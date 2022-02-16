import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { DemographicService } from 'src/app/services/demographic.service';
import { UserService } from 'src/app/services/user.service';
import { UserDemographic } from '../../shared/interfaces/user';
import { DemographicsDialogComponent } from '../components/demographics-dialog/demographics-dialog.component';

@Component({
  selector: 'app-demographics',
  templateUrl: './demographics.component.html',
  styleUrls: ['./demographics.component.css']
})
export class DemographicsComponent implements OnInit {

  showDemographicDetails: boolean = false
  userDetailFields:[{firstName:string, lastName: string, dob: string, gender: string}]= [
    {
      firstName: 'Admin',
      lastName: 'Dan',
      dob: '28/01/1999',
      gender: 'male'
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
    const dialogRef = this.dialog.open(DemographicsDialogComponent, {
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

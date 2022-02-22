import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DemographicService } from 'src/app/services/demographic.service';
import { ImmunizationService } from 'src/app/services/immunization.service';
import { ImmunizationDialogComponent } from '../components/immunization-dialog/immunization-dialog.component';

@Component({
  selector: 'app-immunization',
  templateUrl: './immunization.component.html',
  styleUrls: ['./immunization.component.css']
})

export class ImmunizationComponent implements OnInit {

  showDemographicDetails: boolean = false;
  displayedColumns: string[] = ['name', 'doses', 'lastDoseDate', 'edit', 'delete'];
  otherVaccineColumns: string[] = ['name', 'doses', 'lastDoseDate', 'edit', 'delete'];
  covidVaccinationDetails !:string[];
  otherVaccinationDetails !:string[];

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

  constructor(private immunizationService: ImmunizationService, private fb:FormBuilder, private demoService:DemographicService, public dialog: MatDialog) {}

  ngOnInit(): void {
    let sessionUser:any = sessionStorage.getItem('user');

    if (sessionUser){
      sessionUser = JSON.parse(sessionUser);
      console.log("immunization sessionUser--->",sessionUser)
      this.immunizationService.getImmunizationDetails(sessionUser!.id).then( x =>{
        this.getUserImmunizationDetail();
      })
    }

  }

  // ngAfterViewInit(){
  //   this.getUserImmunizationDetail();
  // }

  getUserImmunizationDetail(){
    this.immunizationService.getImmunizations().subscribe((response:any)=>{
      // console.log("report details of logged in user:- ",response);
      if(response){
        console.log("response--->",response)

        let allVaccinesDetails = response[0].vaccines;
        
        this.covidVaccinationDetails= allVaccinesDetails.filter((record:any) => {
            return record.type === 'COVID';
        });

        this.otherVaccinationDetails= allVaccinesDetails.filter((record:any) => {
          return record.type === 'other';
      });
        console.log("this.covidVaccinationDetails--->",this.covidVaccinationDetails)

        console.log("this.otherVaccinationDetails--->",this.otherVaccinationDetails)
      }
    })
  }

  editCovidVaccineDetails(row:any){

  }

  deleteCovidVaccineRecord(row:any){

  }

  editOtherVaccineDetails(row:any){

  }

  deleteOtherVaccineRecord(row:any){

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
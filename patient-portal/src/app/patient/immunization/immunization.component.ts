import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DemographicService } from 'src/app/services/demographic.service';
import { ImmunizationService } from 'src/app/services/immunization.service';
import { UserDemographic } from 'src/app/shared/interfaces/user';
import { ModalComponent } from 'src/app/shared/modal/modal.component';

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

  constructor(private matDialog: MatDialog, private immunizationService: ImmunizationService, private fb:FormBuilder, private demoService:DemographicService, public dialog: MatDialog) {}

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

  // editCovidVaccineDetails(row:any){

  // }

  deleteCovidVaccineRecord(row:any){
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "220px";
    dialogConfig.width = "360px";
    dialogConfig.data = {
      name: "DeleteCovidVaccineRecord",
      title: "Are you sure? ",
      description: "You want to delete this record ?",
      actionButtonText: "Yes, delete it!"
    }
    const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);
  }


  editOtherVaccineDetails(row:any){
    
  }

  deleteOtherVaccineRecord(row:any){
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "220px";
    dialogConfig.width = "370px";
    dialogConfig.data = {
      name: "DeleteOtherVaccineRecord",
      title: "Are you sure? ",
      description: "You want to delete this record ?",
      actionButtonText: "Yes, delete it!"
    }
    const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);
  }

  editCovidVaccineDetails(vaccineRecord:any){
    const dialogRef = this.dialog.open(ImmunizationDialogComponent, {
      width: '60%',
      // data: this.userDetailFields[0],
      data: {
        covidVaccinationRecord: vaccineRecord
      }
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


@Component({
  selector: 'app-immunization-dialog',
  templateUrl: './immunization-dialog.component.html',
  styleUrls: ['./immunization.component.css']
})

export class ImmunizationDialogComponent implements OnInit {

  demographicsForm!:FormGroup;
  dosesOptions:any=[
    { name: 1 , value : 1},
    { name: 2 , value : 2}
  ];
  allDemographicsData?:UserDemographic[]
  userDemographicData?:UserDemographic

  hideInput:boolean = true


  constructor(
    private fb:FormBuilder,
    private demoService:DemographicService,
    public dialogRef:MatDialogRef<ImmunizationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {console.log(data);}

  ngOnInit(): void {
    this.demographicsForm = this.fb.group({
      // firstName: ['', [Validators.required]],
      vaccineName: ['',Validators.required],
      vaccineNumberOfDoses: [''],
      dateOfLastVaccine: ['']
      // anyOtherVaccines: [''],
      // surgeries: [''],
    })

    if (this.data.covidVaccinationRecord) {
      // this.isEdited = true;
      console.log("this. data --->", this.data)
      this.demographicsForm.setValue({
        vaccineName : this.data.covidVaccinationRecord['name'],
        vaccineNumberOfDoses : this.data.covidVaccinationRecord['doses'],
        dateOfLastVaccine : this.data.covidVaccinationRecord['lastDoseDate']
     });
    }

    this.getDemographicsData()
    
    
  }

  onSubmitClick(formdata:any){
    // alert(`Demographics Form data: ${JSON.stringify(formdata.value)}`)
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
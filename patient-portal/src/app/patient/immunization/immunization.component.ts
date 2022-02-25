import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DemographicService } from 'src/app/services/demographic.service';
import { ImmunizationService } from 'src/app/services/immunization.service';
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
  showLabel:boolean = false;
  sessionUser:any

  constructor(private matDialog: MatDialog, private immunizationService: ImmunizationService,
              private fb:FormBuilder, private demoService:DemographicService,
              public dialog: MatDialog) {}

  ngOnInit(): void {
    this.sessionUser = sessionStorage.getItem('user');

    if (this.sessionUser){
      this.sessionUser = JSON.parse(this.sessionUser);
      console.log("immunization sessionUser--->",this.sessionUser)
      this.immunizationService.getImmunizationDetails(this.sessionUser!.id).then( x =>{
        this.getUserImmunizationDetail();
      })
    }

  }

  getUserImmunizationDetail(){
    this.immunizationService.getImmunizations().subscribe((response:any)=>{
      if(response.length > 0){
        console.log("response--->",response)

        let allVaccinesDetails = response[0].vaccines;
        
        this.covidVaccinationDetails= allVaccinesDetails.filter((record:any) => {
            return record.type === 'COVID';
        });

        this.otherVaccinationDetails= allVaccinesDetails.filter((record:any) => {
          return record.type === 'other';
      });
      }else{
        this.showLabel = true;
        this.covidVaccinationDetails = [];
        this.otherVaccinationDetails = [];
      }
    })
  }

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

  addVaccineDetails(){
    const dialogRef = this.dialog.open(ImmunizationDialogComponent, {
          width: '60%',
        })

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result){
    //     console.log("afterClosed result--->",result)
    //     let vaccineRecord:any = [];
    //     vaccineRecord.push(result);
    //     let requestPayload= {
    //       userId : this.sessionUser.id,
    //       vaccines : vaccineRecord
    //     };
    //     this.immunizationService.createImmunizationDetails(requestPayload);
  }

  editCovidVaccineDetails(vaccineRecord:any){
    const dialogRef = this.dialog.open(ImmunizationDialogComponent, {
      width: '60%',
      data: {
        covidVaccinationRecord: vaccineRecord
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log('the edit demographic dialog was closed');
      const newDetails = result
      console.log('new patient demographics details: ', result);
      if (result){
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

  vaccineDetailsForm!:FormGroup;
  minDate! : any;
  maxDate! : any;
  dosesOptions:any=[
    { name: 1 , value : 1},
    { name: 2 , value : 2}
  ];

  vaccineNumberOfDoses:any= [
    { type: 'COVID' , value : 'COVID'},
    { type: 'OTHER' , value : 'other'}
  ]

  modalTitle:string = '';
  buttonName: string = '';

  constructor(private fb:FormBuilder,
              public dialogRef:MatDialogRef<ImmunizationDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any)
            {
              //setting minDate for vaccination date i.e 2019
              this.minDate = new Date ();
              this.minDate.setFullYear(2019);
              //setting max Date as today's date for vaccination date
              this.maxDate =  new Date();
            }

  ngOnInit(): void {
    this.vaccineDetailsForm = this.fb.group({
      name: ['',Validators.required],
      doses: [''],
      lastDoseDate: [''],
      type: ['']
    })


    if (this.data != null && this.data.covidVaccinationRecord) {
      // this.isEdited = true;
      this.modalTitle = 'Edit Immunization Details';
      this.buttonName = 'Update Details';

      console.log("this. data --->", this.data)
      this.vaccineDetailsForm.setValue({
        name : this.data.covidVaccinationRecord['name'],
        doses : this.data.covidVaccinationRecord['doses'],
        lastDoseDate : this.data.covidVaccinationRecord['lastDoseDate'],
        type : this.data.covidVaccinationRecord['type']
     });
    }else{
      this.modalTitle = 'Add Immunization Details'
      this.buttonName = 'Save Details';
    }
  }

  onSubmitClick(formdata:any){
    console.log("formdata: =>", formdata.value);
    this.dialogRef.close(formdata.value)
  }

  onDialogClose(){
    this.dialogRef.close()
  }


}
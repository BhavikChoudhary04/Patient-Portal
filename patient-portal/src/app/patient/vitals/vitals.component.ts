import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReportService } from 'src/app/services/report.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-vitals',
  templateUrl: './vitals.component.html',
  styleUrls: ['./vitals.component.css']
})
export class VitalsComponent implements OnInit {

  patientVitalsForm !: FormGroup;
  flag: boolean = true;
  validationMessage !:string;
  noRecordfound : boolean = false;
  
  constructor(private userService: UserService, private reportService: ReportService, private fb: FormBuilder,) { }

  ngOnInit(): void {
    // get user Id for logged in user
    this.getUserId();

    this.patientVitalsForm = this.fb.group({
      // vaccineName: [null],
      // vaccineName: [null],
      bloodPressure: [{value: '', disabled: true}],
      pulse: [{value: '', disabled: true}],
      temperature: [{value: '', disabled: true}],
      respiration: [{value: '', disabled: true}],
      height: [{value: '', disabled: true}],
      weight: [{value: '', disabled: true}],
      procedureCode: [{value: '', disabled: true}],
      diagnosisCode: [{value: '', disabled: true}],
      labReport: [{value: '', disabled: true}],
      radiologyReports: [{value: '', disabled: true}],
      medication: [{value: '', disabled: true}]
    });
  }

  getUserId(){
    this.userService.getLoggedInUser().subscribe((user)=>{
      if(user){
        // console.log('logged user id vitals component : ', user.id);
        if(user.id){
          this.reportService.reportByUser(user.id)
        }
      }
    })
  }

  ngAfterViewInit(){
    this.getUserReportDetail();
  }

  getUserReportDetail(){
    // console.log("this.reportService.getUserReport()-->")
    this.reportService.getUserReport().subscribe((response)=>{
      // console.log("report details of logged in user:- ",response);
      if(response){
        this.patientVitalsForm.setValue({
          bloodPressure: response.vitals.bloodPressure,
          pulse: response.vitals.pulse,
          temperature: response.vitals.temperature,
          respiration: response.vitals.respiration,
          height: response.vitals.height,
          weight: response.vitals.weight,
          procedureCode: response.procedureCode,
          diagnosisCode: response.diagnosisCode,
          labReport: response.labReport,
          radiologyReports: response.radiologyReport,
          medication: response.medication
        })
      }else{
        this.noRecordfound = true;
        this.validationMessage = 'Patient need to consult physican to record vitals.' 
      }
    })
  }

}

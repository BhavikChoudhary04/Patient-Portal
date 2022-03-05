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


  demographicsData:UserDemographic[]=[];
  showDetails:boolean = false;
  displayedColumns: string[] = ['firstName', 'lastName', 'dob', 'gender'];
  dataSource:any = this.demographicsData
  displayedColumns2: string[] = ['ethnicity', 'education', 'occupation', 'medicalHistory', 'familymedicalhistory', 'surgeries', 'insuranceProvider'];
  dataSource2:any = this.demographicsData

  constructor(private fb:FormBuilder, private demoService:DemographicService, public dialog: MatDialog, private userService: UserService) {}

  ngOnInit(): void {
    this.getUserId()
  }

  getUserId(){
    this.userService.getLoggedInUser().subscribe((user)=>{
      if(user){
        console.log('user:', user);
        
        this.getDemographicDetail(user.id)
      }
    })
  }

  getDemographicDetail(id:number|undefined){
    this.demoService.fetchDemoData(id).subscribe(data =>{
      if (data){
        console.log(data);
        console.log(this.demographicsData);
        
        this.demographicsData.push(data)
        console.log('this.demographicsData: ', this.demographicsData);
        this.showDetails = true
        this.dataSource = this.demographicsData
        console.log(this.dataSource);
      }
    })
  }

  openEditDemoDialog(): void{
    const dialogRef = this.dialog.open(DemographicsDialogComponent, {
      width: '60%',
      data: this.demographicsData[0]
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log('the edit demographic dialog was closed');
      const newDetails = result
      console.log('new patient demographics details: ', result);
      if (result){
        this.updateDemoDetails(result)
      }
    })
  }

  updateDemoDetails(updatedUser:UserDemographic){
    this.demographicsData[0].ethnicity = updatedUser.ethnicity
    this.demographicsData[0].education = updatedUser.education
    this.demographicsData[0].occupation = updatedUser.occupation
    this.demographicsData[0].medicalHistory = updatedUser.medicalHistory
    this.demographicsData[0].familymedicalhistory = updatedUser.familymedicalhistory
    this.demographicsData[0].surgeries = updatedUser.surgeries
    this.demographicsData[0].insuranceProvider = updatedUser.insuranceProvider

    this.demoService.updateDemoData(this.demographicsData[0])
    
  }
}

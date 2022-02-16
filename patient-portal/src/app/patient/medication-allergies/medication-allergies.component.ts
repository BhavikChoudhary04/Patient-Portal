import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { UserMedicationsAllergies } from '../../shared/interfaces/user';
import { MedicationsDialogComponent } from '../components/medications-dialog/medications-dialog.component';

@Component({
  selector: 'app-medication-allergies',
  templateUrl: './medication-allergies.component.html',
  styleUrls: ['./medication-allergies.component.css']
})
export class MedicationAllergiesComponent implements OnInit {
  showMedicationDetails: boolean = false
  userMedicationValues:[
    {
      current_medication:string,
      otc: string,
      antibiotics: string,
      social_drugs: string,
      past_medication: string,
      drug_allergies: string,
      other_allergies: string
  }] =[{
    current_medication:'',
    otc: '',
    antibiotics: '',
    social_drugs: '',
    past_medication: '',
    drug_allergies: '',
    other_allergies: ''
  }]

  constructor(private fb:FormBuilder, private userService:UserService,public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openMediactionsDialog():void{
    const dialogRef = this.dialog.open(MedicationsDialogComponent, {
      width: '60%',
      data: {message: 'opened medication form'}
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log('the edit demographic dialog was closed');
      const newDetails = result
      console.log('new patient demographics details: ', result);
      if (result){
        this.userMedicationValues[0] = result
        console.log('userMedicationValues', this.userMedicationValues[0]);
        this.showMedicationDetails = true
      }
    })
  }



}

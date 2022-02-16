import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { UserMedicationsAllergies } from 'src/app/shared/interfaces/user';
@Component({
  selector: 'app-medications-dialog',
  templateUrl: './medications-dialog.component.html',
  styleUrls: ['./medications-dialog.component.css']
})
export class MedicationsDialogComponent implements OnInit {
  medicationForm!:FormGroup
  allMedicationsData?:UserMedicationsAllergies[]
  userMedicationsData?:UserMedicationsAllergies

  constructor(private fb:FormBuilder, private userService:UserService, public dialogRef:MatDialogRef<MedicationsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserMedicationsAllergies) { }

  ngOnInit(): void {
    this.medicationForm = this.fb.group({
      current_medication: ['', [Validators.required]],
      otc: ['', [Validators.required]],
      antibiotics: ['', Validators.required],
      social_drugs: ['', Validators.required],
      past_medication: [''],
      drug_allergies: ['' ,Validators.required],
      other_allergies: ['', Validators.required]
    })
  }

   onSubmitClick(formdata:any){
     alert(`Medications and Allergies form data: ${JSON.stringify(formdata.value)}`)
     this.userMedicationsData = this.medicationForm.value
     if (this.userMedicationsData){
      //  this.addMedicationsData(this.userMedicationsData)
      console.log(this.userMedicationsData);
      
     }
   }

  // addMedicationsData(userData:UserMedicationsAllergies){
  //   this.userService.addMedicationsData(userData).subscribe((data) => {
  //     if(data){
  //       const newUserData = data
  //       console.log('pattient mediactions and allergies data submitted, new userdata: ',newUserData);
  //     }
  //   })
  // }

  // getDemographicsData (){
  //   this.userService.getAllDemographicsData().subscribe((data)=>{
  //     if(data){
  //       this.allMedicationsData = data
  //       console.log('allMedicationsData: ', this.allMedicationsData);
  //     }
  //   })
  // }
  onDialogClose(){
    this.dialogRef.close()
  }


}

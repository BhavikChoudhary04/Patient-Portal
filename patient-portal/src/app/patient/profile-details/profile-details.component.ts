import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { RegisterUser } from 'src/app/shared/interfaces/user';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit {

  showDetails:boolean = false;
  showInputFields:boolean = false;
  userDetail!:RegisterUser;
  profileForm!:FormGroup;

  constructor(private userService: UserService, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.getUserId()
    
  }
  getUserId(){
    this.userService.getLoggedInUser().subscribe((user)=>{
      if(user){
        console.log('logged in user id: ', user.id);
        this.getUserDetail(user.id)
      }
    })
  }

  getUserDetail(id:number|undefined){
    this.userService.getUserDetail(id).subscribe(data => {
      if(data){
        this.userDetail = data
        console.log('userDetail', this.userDetail);
        this.showDetails = true
        this.showInputFields = true
        this.profileForm = this.fb.group({
          firstName: [{value: this.userDetail.firstName,disabled: this.showInputFields}],
          lastName: [{value: this.userDetail.lastName,disabled: this.showInputFields}],
          userName: [{value: this.userDetail.userName,disabled: this.showInputFields}],
          email: [{value: this.userDetail.email,disabled: this.showInputFields}],
          role: [{value: this.userDetail.role,disabled: this.showInputFields}],
          dob: [{value: this.userDetail.dob,disabled: this.showInputFields}],
          mobile: [{value: this.userDetail.mobile,disabled: this.showInputFields}]
        })
      }
    })
  }

  editProfile(){
    this.profileForm.enable()
    this.showInputFields = false
  }

  onSaveDetails(profileForm:any){
    if (profileForm){
      this.userDetail.firstName = profileForm.value.firstName
      this.userDetail.lastName = profileForm.value.lastName
      this.userDetail.userName = profileForm.value.userName
      this.userDetail.email = profileForm.value.email
      this.userDetail.role = profileForm.value.role
      this.userDetail.dob = profileForm.value.dob
      this.userDetail.mobile = profileForm.value.mobile
      
      console.log('this.userDetail', this.userDetail);
      
      if (this.userDetail){
        this.userService.updateUser(this.userDetail)
      }
      this.showInputFields = false
    }
  }
  onCancelClick(){
    this.showInputFields = true
    console.log(this.showInputFields);
    
  }

}

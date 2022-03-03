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
    this.profileForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      userName: [''],
      email: [''],
      role: [''],
      dob: [''],
      mobile: ['']
    })
    
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
      }
    })
  }

  editProfile(){
    this.profileForm.setValue({
      firstName: this.userDetail.firstName,
      lastName: this.userDetail.lastName,
      userName: this.userDetail.userName,
      email: this.userDetail.email,
      role: this.userDetail.role,
      dob: this.userDetail.dob,
      mobile: this.userDetail.mobile
    })
    this.showInputFields = true
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
      
      console.log(this.userDetail);
      
      if (this.userDetail){
        this.userService.updateUser(this.userDetail)
      }
      this.showInputFields = false
    }
  }

}

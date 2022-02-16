import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { RegisterUser } from 'src/app/shared/interfaces/user';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit {

  userDetail:RegisterUser[] =[{
    id: 0,
    firstName: "",
    lastName: "",
    dob: "",
    userName: "",
    mobile: "",
    role: "",
    email: "",
    password:"",
    isAuthenticated: false
  }]
  showDetails:boolean = false

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUserDetail()
  }
  getUserDetail(){
    this.userService.getLoggedInUser().subscribe(async (user)=>{
      await user;
      if(user){
        this.userDetail[0] = user
      this.showDetails = true
      console.log(this.userDetail);
      }
      
    })
  }

}

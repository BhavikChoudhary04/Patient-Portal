import { Component, OnInit } from '@angular/core';
import { RegisterUser } from 'src/app/shared/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  name: string = '';
  role: string = '';

  userDetail!:RegisterUser;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUserId();
  }

  getUserId(){
    this.userService.getLoggedInUser().subscribe((user)=>{
      if(user){
        console.warn('logged in user id: ', user.id);
        this.getUserDetail(user.id)
      }
    })
  }

  getUserDetail(id:number|undefined){
    this.userService.getUserDetail(id).subscribe(data => {
      if(data){
        this.userDetail = data;
        this.name = this.userDetail.firstName;
        this.role = this.userDetail.role;
        // console.warn('userDetail', this.userDetail);
        // console.warn('Username: '+this.userDetail.firstName);
        // console.warn('Username: '+this.userDetail.role);
      }
    })
  }

}

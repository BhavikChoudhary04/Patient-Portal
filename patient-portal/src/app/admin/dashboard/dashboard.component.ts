import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { RegisterUser } from 'src/app/shared/interfaces/user';
import { ChartErrorEvent, ChartType, GoogleChartComponent } from 'angular-google-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  unAuthUsers!:RegisterUser[]
  chart = {
    title: "My Chart",
    type: ChartType.Line,
    data: [
      ['January', 25, 153, 57],
      ['February', 21, 144, 54],
      ['March', 32, 170, 63],
      ['April', 27, 156, 60],
      ['May', 37, 180, 67],
    ],
    columnNames: ['Months', 'Daily', 'Weekly', 'Monthly'],
    options: {
      colors: ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6'],
      is3D: true
    }
  }


  constructor(private userService: UserService, private elementRef: ElementRef) { 
    
  }

  ngOnInit(): void {
    this.userService.unAuthenticatedUsers();
    this.userService.getUnAuthusers().subscribe(users => {
      this.unAuthUsers = users
    });
  }

  deleteUser(user:RegisterUser){
    this.userService.deleteUser(user.id)
  }

  authenticateUser(user:RegisterUser){
    this.userService.authenticateUser(user)
  }

  

}

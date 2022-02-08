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
  monthToggle:Boolean = true
  weekToggle:Boolean = false
  dayToggle:Boolean = false
  billArr = [
    {
      "billNo": 1029876,
      "name" : "Phil",
      "visit": "OPD",
      "amount": "$ 109"
  },
  {
    "billNo": 1029790,
    "name" : "Tankado",
    "visit": "In-patient",
    "amount": "$ 980"
},
{
  "billNo": 1029606,
  "name" : "John",
  "visit": "Day care",
  "amount": "$ 567"
},
{
  "billNo": 1030987,
  "name" : "Mark",
  "visit": "OPD",
  "amount": "$ 257"
},
  ]


  chartMonth = {
    title: "My Chart",
    type: ChartType.Line,
    data: [
      ['Jan', 590],
      ['Feb', 600],
      ['Mar', 620],
      ['Apr', 602],
      ['May', 589],
      ['Jun', 577],
      ['Jul', 632],
      ['Aug', 645],
      ['Sep', 611],
      ['Oct', 588],
      ['Nov', 593],
      ['Dec', 619],

    ],
    columnNames: ['Month', 'Patients/Month'],
    options: {
      colors: ['#ff6384'],
      is3D: true
    }
  }

  chartWeek = {
    title: "My Chart",
    type: ChartType.Line,
    data: [
      ['Week 1', 156],
      ['Week 2', 160],
      ['Week 3', 159],
      ['Week 4', 166]

    ],
    columnNames: ['Week/Month', 'Patients/Week'],
    options: {
      colors: ['#4bc0c0'],
      is3D: true
    }
  }

  chartDay = {
    title: "My Chart",
    type: ChartType.Line,
    data: [
      ['Mon', 22],
      ['Tue', 24],
      ['Wed', 21],
      ['Thu', 25],
      ['Fri', 23],
      ['Sat', 28],
      ['Sun', 30]

    ],
    columnNames: ['Day/Week', 'Patients/Day'],
    options: {
      colors: ['#ffce56'],
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

  toggleChart(event:string){
    if (event == 'month'){
      this.monthToggle = true;
      this.dayToggle = false;
      this.weekToggle = false;
    } else if (event == 'week'){
      this.monthToggle = false;
      this.dayToggle = false;
      this.weekToggle = true;
    } else if (event == 'day'){
      this.monthToggle = false;
      this.dayToggle = true;
      this.weekToggle = false;
    }
  }

  deleteUser(user:RegisterUser){
    this.userService.deleteUser(user.id)
  }

  authenticateUser(user:RegisterUser){
    this.userService.authenticateUser(user)
  }

  

}

import { Component } from '@angular/core';
import { ReportService } from './services/report.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'patient-portal';

  constructor(){

  }
}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SnackbarActionsService {

  constructor(private router: Router) { }

  performAction(value:string){
    switch (value){
    case "reset":
      this.router.navigateByUrl('/login');
      break
    default:
      return
    }
    
  }
}

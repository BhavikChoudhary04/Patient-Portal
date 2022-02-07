import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ModalActionsService {
  constructor(private router: Router) {}

  // This function is the only way this service is directly called in the modal.
  // The modal passes to it the received `data` object and then this function\
  // calls the appropriate function based on the name of the modal. Then, that\
  // function receives whatever values it needs that were included in `data`
  modalAction(modalData: any) {
    switch (modalData.name) {
      case 'logout':
        this.logout(modalData);
        break;

      default:
        break;
    }
  }

  // While the following functions don't make sense in this demo, I've created\
  // them for the sake of mentioning scenearios where the values from data\
  // couldn't be passed directly to the other service calls

  private logout(modalData: any) {
    // Call an authentication service method to logout the user
    sessionStorage.clear();
    this.router.navigateByUrl('/auth/login')
  }
  
}

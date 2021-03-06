import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class PatientGuard implements CanActivateChild {
  constructor(private router:Router, private userService:UserService){}

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      let routePermission = false;
      const sessionUser = sessionStorage.getItem('user');      
      let loggedInSessionUser = {role : ""}
      if (sessionUser){
        loggedInSessionUser = JSON.parse(sessionUser)
      }

      this.userService.getLoggedInUser().subscribe(user => {
        if (user.role == 'patient' && loggedInSessionUser?.role == 'patient'){
          routePermission = true
        } else {
          alert("This website does not allow page refresh. Kindly login again to continue on the webpage.")
          routePermission = false
          sessionStorage.clear();
          this.router.navigateByUrl('/auth/login')
        }
      })
      

      return routePermission
  }
  
}

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class PhysicianGuard implements CanActivateChild {
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
        if (user.role == 'physician' && loggedInSessionUser?.role == 'physician'){
          routePermission = true
        } else {
          routePermission = false
          sessionStorage.clear();
          this.router.navigateByUrl('/login')
        }
      })

      return routePermission
  }
  
}

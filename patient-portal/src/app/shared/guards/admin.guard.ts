import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivateChild {

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
        if (user.role == 'admin' && loggedInSessionUser?.role == 'admin'){
          routePermission = true
        } else {
          routePermission = false
          this.router.navigateByUrl('/login')
        }
      })

      return routePermission
  }
  
}

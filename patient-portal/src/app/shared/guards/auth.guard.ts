import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const loggedInUser = sessionStorage.getItem('user')
      if (loggedInUser){
        const user = JSON.parse(loggedInUser)

        if (user.role === 'admin' || 'physician' || 'patient'){
          return true
        }
      }
    
    this.router.navigateByUrl('/auth/login')
    return false
  }
  
}

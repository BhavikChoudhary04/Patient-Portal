import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Injectable()
export class AuthenticateInterceptor implements HttpInterceptor {

  constructor(private userService:UserService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let modified = request
    this.userService.getToken().subscribe(token => {
      if (token){
        modified = request.clone({ 
          setHeaders: { "Authorization": `Bearer ${token}` } 
        });
      }
    })
    
    return next.handle(modified);
  }
}

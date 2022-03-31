import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';
import { SessionQuery } from '../store/session.query';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService {

  constructor(private session: SessionQuery) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // add auth header with jwt if account is logged in and request is to the api url

    const user = this.session.userDetails$;

    const accessToken = user?.accessToken;

    const isApiUrl = request.url.startsWith(environment.apiUrl);

    console.log(user?._id);

     if (accessToken && isApiUrl) {

      request = request.clone({
        setHeaders: { Authorization: `Bearer ${accessToken}`, 'Content-Type': "application/json" }
      });        
      
     }
     
    return next.handle(request);
  }
}

import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ArtEvent } from '../interfaces/art-event';
import { Login } from '../interfaces/login';
import { Signup } from '../interfaces/signup';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) { }

  //----- Login
  login(user: Login): Observable<any>
  {
    return this.http.post<any>('http://localhost:3000/user/login', user)
    .pipe(map(user => {

      localStorage.setItem('currentUser', JSON.stringify(user))
      return user;

    }
    ))
  }

  //----- Signup
  
    public signup(user: Signup): Observable<any> {

      return this.http.post<any>('http://localhost:3000/user/signup', user)
      .pipe(map(user => {
        localStorage.setItem('currentUser', JSON.stringify(user))
  
        return user;
      }
      ))
    }

  //----- GetEvents
  getEvents(): Observable<ArtEvent[]> {

    console.log("getEvents service functions")

    const url = 'http://localhost:8080/api/events';

    return this.http.get<ArtEvent[]>(url)
    .pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
          `body was: ${JSON.stringify(error.error)}`
      );
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }

}

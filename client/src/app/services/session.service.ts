import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { SessionStore } from '../store/session.store';
import { Signup } from '../interfaces/signup';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { Login } from '../interfaces/login';
import { resetStores } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class SessionService {

  private url = 'https://localhost:8080/api/v1';

  constructor(private sessionStore: SessionStore, private http: HttpClient) { }

    // Register (post) a user

    public signup(user: Signup): Observable<any> {

        return this.http.post<any>(`${this.url}/signup`, user)
        .pipe(tap(user => {
            // Updating session state
            this.sessionStore.update(() => ({
                accessToken: user.accessToken,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                _id: user._id
            }));
        }))
      }
    
      // Login (post) a user

      public login(user: Login): Observable<any> {
    
        return this.http.post<any>(`${this.url}/login`, user)
        .pipe(tap(user => {

          console.log(user);

          // Updating session state
          this.sessionStore.update(() => ({
            accessToken: user.accessToken,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            _id: user._id
          }));
      })
      // ,
      // retry(1),
      // catchError(this.handleError)
      )
    }

    public logout() {

      resetStores({ exclude: ['artEvents']});

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
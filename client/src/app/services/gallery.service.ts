import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Art } from '../interfaces/art';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  private url = 'https://collectionapi.metmuseum.org/public/collection/v1/search?q='; // Returns objectIDs

  //private url = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/'; // Returns details of objectID

  constructor(private http: HttpClient) { }

  getArt(query: string): Observable<Art[]> {

    query = query.replace(/\s/g, "%20"); // Replaces spaces in string (' ') with %20

    console.log("getArt() called | gallery.service.ts");

    console.log(`${this.url}${query}`);

    return this.http
      .get<Art[]>(`${this.url}${query}`)
      .pipe(retry(1),
      catchError(this.handleError));
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

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { arrayAdd } from '@datorama/akita';
import { forkJoin, Observable, of, throwError } from 'rxjs';
import { catchError, retry, switchMap, tap } from 'rxjs/operators';
import { Art } from '../interfaces/art';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  private url = 'https://collectionapi.metmuseum.org/public/collection/v1/';

  art! : Art[];

  artIDs!: number[];

  constructor(private http: HttpClient) { }

  // attempt to retrieve artIds and art within the same method

  // getArt(query: string): Observable<Art[]> {

  //   query = query.replace(/\s/g, "%20"); // Replaces spaces in string (' ') with %20

  //   console.log("getArt() called | gallery.service.ts");

  //   console.log(`${this.url}${query}`);

  //   // The following API returns objectIDs of art that matches the query

  //   this.http.get<any>(`${this.url}search?q=${query}`).subscribe((res) => {

  //     this.artIDs = res.objectIDs,

  //     // Performing a get request to retrieve information about each objectID in the artIDs array

  //     this.artIDs.forEach(element => {
  //       this.http.get<Art>(`${this.url}objects/${element}`).subscribe((res) => {
  //         this.art.push(res)
  //       });
  //     });
  //   });
  //   return of(this.art)
  // }

  // getArtIds()

  getArtIds(query: string) : Observable<any>
  {
    query = query.replace(/\s/g, "%20"); // Replaces spaces in string (' ') with %20

    console.log("getArtIds() called | gallery.service.ts");

    console.log(`${this.url}search?q=${query}`);

    return this.http.get<any>(`${this.url}search?q=${query}`).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  // getArt()

  getArt(objectId: number) : Observable<Art>
  {
    console.log("getArt() called | gallery.service.ts");

    console.log(`${this.url}objects/${objectId}`);

    return this.http.get<Art>(`${this.url}objects/${objectId}`).pipe(
      retry(1),
      catchError(this.handleError)
    );
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

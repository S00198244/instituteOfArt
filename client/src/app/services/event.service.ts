import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { ArtEvent } from '../interfaces/art-event';
import { EventStore } from '../store/event.store';
import { EventQuery } from '../store/event.query';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private url = 'https://localhost:8080/api/v1';

  constructor(private http: HttpClient, private eventStore: EventStore, private eventQuery: EventQuery) { }

    // Set active entity (Active (current) ArtEvent)

    setActive(id: string)
    {
      this.eventStore.setActive(id);
    }

    // getEvents() - Get all events

    getEvents(): Observable<ArtEvent[]> {

      console.log("getEvents service functions");

      return this.http.get<ArtEvent[]>(`${this.url}/events`).pipe(
        tap(event => {
          this.eventStore.loadEvents(event, true) // [event]
        }
      ),
      retry(1),
      catchError(this.handleError)
      );
    }

    // createEvent() - Create an event

    createEvent(event: ArtEvent): Observable<any> {

      console.log("In createEvent() | (event.service.ts)");

      return this.http.post<ArtEvent>(`${this.url}/events`, event).pipe(
        tap(event => {
          this.eventStore.add([event])
        }),
        retry(1),
        catchError(this.handleError)
      );

    }

    // updateEvent() - Update an event

    updateEvent(eventID: string, event: ArtEvent): Observable<ArtEvent> {

      console.log("In updateEvent() | (event.service.ts)");

      console.table(event);

      console.log(`${this.url}/event/${eventID}`);

      // 'https://localhost:8080/api/v1'

      return this.http.patch<ArtEvent>(`${this.url}/event/${eventID}`, event).pipe(
        tap(event => {
          this.eventStore.update(eventID, event)
        }),
        retry(1),
        catchError(this.handleError)
      );
    }

    // deleteEvent() - Delete an event

    deleteEvent(eventID: string): Observable<any> {

      console.log("In deleteEvent() | (event.service.ts)");

      return this.http.delete(`${this.url}/event/${eventID}`).pipe(
        tap(result => {
          this.eventStore.remove(eventID);
        }),
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

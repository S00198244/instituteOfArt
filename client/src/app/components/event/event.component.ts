import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { switchMap, filter } from 'rxjs/operators';
import { ArtEvent } from 'src/app/interfaces/art-event';
import { EventService } from 'src/app/services/event.service';
import { EventQuery } from 'src/app/store/event.query';
import { EventState } from 'src/app/store/event.store';
import { SessionQuery } from 'src/app/store/session.query';


@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit, OnDestroy {

  eventToBeUpdated: ArtEvent | any;
  isUpdateActivated = false;
  listEventSub!: Subscription;
  deleteEventSub!: Subscription;
  updateEventSub!: Subscription;
  estate!: EventState;

  artEvents$: Observable<ArtEvent[]> = this.artEventQuery.artEvents$;

  // artEvents!: ArtEvent[];
  // message?: string;
  // currentEvent!: ArtEvent;

  constructor(private service: EventService, private router: Router, private artEventQuery: EventQuery, private sessionQuery: SessionQuery) { }

  ngOnInit(): void {

    console.log(this.sessionQuery.userDetails$);

    this.listEventSub = this.artEventQuery.selectAreEventsLoaded$.pipe(
      filter(areEventsLoaded => !areEventsLoaded),
      switchMap(areEventsLoaded => {
        if (!areEventsLoaded) {
          return this.service.getEvents();
        } else return ''
      })
    ).subscribe(result => {})

  }

  ngOnDestroy() {

    if (this.listEventSub) {
      this.listEventSub.unsubscribe();
    }

    if (this.deleteEventSub) {
      this.deleteEventSub.unsubscribe();
    }

    if (this.updateEventSub) {
      this.updateEventSub.unsubscribe();
    }
  }

  clicked(event: ArtEvent): void {

    console.table(event);

    this.service.setActive(event._id);

    // this.currentEvent = event;
    // console.table(this.currentEvent);

    // Setting clicked event in store
    // this.service.updateEvent(this.currentEvent);

  }

  goToEventDetails() {
    this.router.navigate(['/eventDetails']);
  }

  // deleteEvent()

  deleteEvent(eventID: string) {
    this.deleteEventSub = this.service.deleteEvent(eventID).subscribe(result => {
      console.log(result);
    });
  }

  showUpdateForm(event: Event) {
    this.isUpdateActivated = true;
    this.eventToBeUpdated = {...event};
  }

  // updateEvent()

  updateEvent(updateForm: { value: ArtEvent; }) {
    this.updateEventSub = this.service.updateEvent(
      this.eventToBeUpdated.id, updateForm.value).subscribe(result => console.log(result)
    );
    this.isUpdateActivated = false;
    this.eventToBeUpdated = null;
  }
}

import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  closeResult!: '';

  /*
  eventToBeUpdated: ArtEvent | any;
  isUpdateActivated = false;
  updateEventSub!: Subscription;
  */

  listEventSub!: Subscription;
  deleteEventSub!: Subscription;
  estate!: EventState;

  artEvents$: Observable<ArtEvent[]> = this.artEventQuery.artEvents$;

  eventForm!: FormGroup;

  @ViewChild('btnClose')
  btnClose!: ElementRef;

  constructor(private service: EventService, private router: Router, private artEventQuery: EventQuery, private sessionQuery: SessionQuery) {

    this.eventForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      summary: new FormControl(null, Validators.required)
    })
   }

  ngOnInit() {

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

    /*
    if (this.updateEventSub) {
      this.updateEventSub.unsubscribe();
    }
    */
  }

  setActiveEvent(event: ArtEvent) {

    this.service.setActive(event._id);
    
  }

  goToEventDetails(event: ArtEvent) {

    this.setActiveEvent(event);

    this.router.navigate(['/eventDetails']);
  }

  // deleteEvent()

  deleteEvent(eventID: string) {
    this.deleteEventSub = this.service.deleteEvent(eventID).subscribe(result => {
      console.log(result);
    });
  }

  /* 
    showUpdateForm(event: Event) {
    this.isUpdateActivated = true;
    this.eventToBeUpdated = {...event};
  }

  updateEvent(updateForm: { value: ArtEvent; }) {
    this.updateEventSub = this.service.updateEvent(
      this.eventToBeUpdated.id, updateForm.value).subscribe(result => console.log(result)
    );
    this.isUpdateActivated = false;
    this.eventToBeUpdated = null;
  }
  */

  goToEditEvent(event: ArtEvent) {

    this.setActiveEvent(event);

    this.router.navigate(['/editEvent']);
  }

  addEvent() {

    console.log('In addEvent()');

    console.log(this.eventForm.value);

    this.service.createEvent(this.eventForm.value).subscribe((res) => console.log(res));

    this.btnClose.nativeElement.click();

    this.eventForm.reset();
  }


}

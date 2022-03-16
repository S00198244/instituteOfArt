import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ArtEvent } from 'src/app/interfaces/art-event';
import { EventQuery } from 'src/app/store/event.query';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  artEvent$!: ArtEvent | undefined;

  constructor(private session: EventQuery) {
  this.session.artEvent$.subscribe(res => this.artEvent$ = res)
  }
 
  ngOnInit(): void { 

  console.log(this.artEvent$);
  }

}

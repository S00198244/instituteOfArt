import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ArtEvent } from 'src/app/interfaces/art-event';
import { EventService } from 'src/app/services/event.service';
import { EventQuery } from 'src/app/store/event.query';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {

  artEvent$!: ArtEvent | undefined;

  eventForm!: FormGroup;

  constructor(private session: EventQuery, private eventService: EventService, private router: Router) {

    this.session.artEvent$.subscribe(res => this.artEvent$ = res)

   }

  ngOnInit(): void {

    console.log(this.artEvent$);

    this.eventDataInitialiser();
  }

  eventDataInitialiser() {

    this.eventForm = new FormGroup({
      title: new FormControl(this.artEvent$?.title, Validators.required),
      summary: new FormControl(this.artEvent$?.summary)
    })

  }

  updateEvent() {

    console.log(this.eventForm.value);

    this.eventService.updateEvent(this.artEvent$!._id, this.eventForm.value).subscribe((res) => console.log(res));

    this.router.navigate(['/']);
  }
}

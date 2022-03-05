import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ArtEvent } from 'src/app/interfaces/art-event';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  artEvents!: ArtEvent[];
  message?: string;

  constructor(private service: BackendService) { }

  ngOnInit(): void {
    
    this.getEvents();
  }

  getEvents() {

    console.log("In events");

    this.service.getEvents().subscribe({
      next: (value: ArtEvent[]) => {
        this.artEvents = value,
        console.log(value)
      },
      complete: () => console.log(),
      error: (mess) => this.message = mess
    })
  }
}

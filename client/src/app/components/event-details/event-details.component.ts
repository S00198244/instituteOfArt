import { Component, OnInit } from '@angular/core';
import { arrayAdd, arrayRemove, arrayUpdate } from '@datorama/akita';
import { Observable } from 'rxjs';
import { ArtEvent } from 'src/app/interfaces/art-event';
import { EventQuery } from 'src/app/store/event.query';
import { EventStore } from 'src/app/store/event.store';
import { SessionQuery } from 'src/app/store/session.query';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  artEvent$!: ArtEvent | undefined;

  userID$!: string | null;

  constructor(private sessionQuery: SessionQuery, private eventQuery: EventQuery, private eventStore: EventStore) {

  this.eventQuery.artEvent$.subscribe(res => this.artEvent$ = res)

  this.sessionQuery.userID$.subscribe(res => this.userID$ = res);

  }
 
  ngOnInit(): void { 

  console.log(this.artEvent$);

  }

  // Adding a comment

  addComment(newComment: string) {

    this.eventStore.update(this.artEvent$?._id!, ({comments}) => ({
      comments: arrayAdd(comments, newComment)
    }));
  }

  // Deleting a comment

  removeComment(commentID: number) {

    // if (this.userID$)

    this.eventStore.update(this.artEvent$?._id!, ({comments}) => ({
      comments: arrayRemove(comments, commentID)
    }));


  }

  // Edit (update) a comment

  editComment(commentID: number, newComment: string) {

    this.eventStore.update(this.artEvent$?._id!, ({ comments }) => ({
      comments: arrayUpdate(comments, commentID, { text: newComment })
    }));
  }

}

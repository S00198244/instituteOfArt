import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita'; 
import { EventStore, EventState } from './event.store';

@Injectable({ providedIn: 'root' })
export class EventQuery extends QueryEntity<EventState> {

  // Select an entity by id
  artEvent$ = this.selectActive();

  selectAreEventsLoaded$ = this.select(state => {

  console.log(state.areEventsLoaded);
    
  return state.areEventsLoaded;
  
  });

  // Observable
   artEvents$ = this.selectAll();

   // Raw value
   artEvents = this.getAll();

   constructor(protected store: EventStore) {
    super(store);
  }
}
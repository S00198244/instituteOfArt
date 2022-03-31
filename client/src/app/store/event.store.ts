import { Injectable } from '@angular/core';

import { ArtEvent } from '../interfaces/art-event';

import { EntityStore, StoreConfig, EntityState, ActiveState, ID } from '@datorama/akita';

export interface EventState extends EntityState<ArtEvent, string>, ActiveState {

    // _id: string,
    // title: string,
    // summary: string,

    areEventsLoaded: false
    filter: string
}

export function createInitialState(): EventState {
  return {
    filter: 'ALL',
    areEventsLoaded: false,
    active: 0
  };
}

// export function createInitialState(): EventState {
//     return {
//         _id: '',
//         title: '',
//         summary: ''
//     };
// }

@Injectable({ providedIn: 'root'})
@StoreConfig({ name: 'artEvents', idKey: '_id', resettable: true})
export class EventStore extends EntityStore<EventState> {

  constructor() {
    super(createInitialState());
  }

  // Load events

  loadEvents(artEvents: ArtEvent[], areEventsLoaded: boolean) {

    this.set(artEvents);

    console.log(artEvents);

    this.update(state => ({
      ...state,
      areEventsLoaded
    }));
  }
}



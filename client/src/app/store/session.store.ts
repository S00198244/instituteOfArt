import { Injectable } from '@angular/core';
import { EntityStore, StoreConfig, EntityState } from '@datorama/akita';

export interface SessionState {
    accessToken: string,
    firstName: string,
    lastName: string,
    email: string,
    _id: string
}

export function createInitialState(): SessionState {
    return {
        accessToken: '',
        firstName: '',
        lastName: '',
        email: '',
        _id: ''
    };
}

@Injectable({ providedIn: 'root'})
@StoreConfig({ name: 'session' , resettable: true})
export class SessionStore extends EntityStore<SessionState> {

  constructor() {
    super(createInitialState());
  }

  // login(session: SessionState) {
  //   this.update(session);
  //   //storage.saveSession(session);
  // }

  // logout() {
  //   //storage.clearSesssion();
  //   this.update(createInitialState());
  // }
}
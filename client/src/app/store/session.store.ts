import { Injectable } from '@angular/core';
import { EntityStore, StoreConfig, EntityState } from '@datorama/akita';

export interface SessionState {
    accessToken: string,
    firstName: string,
    lastName: string,
    email: string,
    userID: number
}

export function createInitialState(): SessionState {
    return {
        accessToken: '',
        firstName: '',
        lastName: '',
        email: '',
        userID: 0
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
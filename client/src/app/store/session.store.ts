import { Injectable } from '@angular/core';
import { EntityStore, StoreConfig, EntityState } from '@datorama/akita';

export interface SessionState {
    accessToken: string | null,
    firstName: string | null,
    lastName: string | null,
    email: string | null,
    _id: string | null,
    admin: boolean
}

export function createInitialState(): SessionState {
    return {
        accessToken: null,
        firstName: null,
        lastName: null,
        email: null,
        _id: null,
        admin: false
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
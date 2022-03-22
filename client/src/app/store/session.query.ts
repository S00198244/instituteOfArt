import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita'; 
import { SessionStore, SessionState } from './session.store';

@Injectable({ providedIn: 'root' })
export class SessionQuery extends Query<SessionState> {

    name$ = this.getValue().firstName;
    
    userID$ = this.select((state) => state._id);

    userId$ = this.getValue()._id;

    //$userDetails = this.select(['userID','firstName','lastName','email','accessToken']);
    
    userDetails$ = this.getValue();

  constructor(protected store: SessionStore) {
    super(store);
  }

  get isLoggedIn() {
    return !!this.getValue().accessToken;
  }
}
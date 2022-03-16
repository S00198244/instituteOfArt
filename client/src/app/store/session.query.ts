import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita'; 
import { SessionStore, SessionState } from './session.store';

@Injectable({ providedIn: 'root' })
export class SessionQuery extends Query<SessionState> {

    name$ = this.getValue().firstName;
    
    userID$ = this.select((state) => state.userID);

    userId$ = this.getValue().userID;

    //$userDetails = this.select(['userID','firstName','lastName','email','accessToken']);
    $userDetails = this.getValue();

  constructor(protected store: SessionStore) {
    super(store);
  }
}
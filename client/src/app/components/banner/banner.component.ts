import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';
import { SessionQuery } from 'src/app/store/session.query';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  loggedIn!: boolean;

  constructor(private sessionQuery: SessionQuery, private sessionService: SessionService) {
    this.loggedIn = this.sessionQuery.isLoggedIn;
  }

  ngOnInit(): void {
  }

  logout() {

    this.sessionService.logout();
    
  }

}

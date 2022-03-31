import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionService } from 'src/app/services/session.service';
import { SessionQuery } from 'src/app/store/session.query';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  // accessToken$!: Observable<string | null>;

  isLoggedIn!: boolean;

  constructor(private sessionQuery: SessionQuery, private sessionService: SessionService) {

    // this.accessToken$ = this.sessionQuery.accessToken$;

    this.isLoggedIn = sessionQuery.isLoggedIn;
    
  }

  ngOnInit(): void {

    console.log(this.isLoggedIn);
  }

  logout() {

    this.sessionService.logout();
    
  }

}

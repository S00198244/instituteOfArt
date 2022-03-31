import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventComponent } from './components/event/event.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { BannerComponent } from './components/banner/banner.component';
import { EditEventComponent } from './components/edit-event/edit-event.component';

@NgModule({
  declarations: [
    AppComponent,
    EventComponent,
    LoginComponent,
    SignupComponent,
    EventDetailsComponent,
    GalleryComponent,
    BannerComponent,
    EditEventComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

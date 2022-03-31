import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditEventComponent } from './components/edit-event/edit-event.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { EventComponent } from './components/event/event.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './security/auth.gaurd';

const routes: Routes = [
  {path: '', component: EventComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'eventDetails', component: EventDetailsComponent},
  {path: 'editEvent', component: EditEventComponent, canActivate: [AuthGuard]},
  {path: 'gallery', component: GalleryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }

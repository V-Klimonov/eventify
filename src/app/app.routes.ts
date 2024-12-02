import { Routes } from '@angular/router';
import { CreateEventComponent } from './events/components/create-event/create-event.component';
import { EventDashboardComponent } from './events/components/event-dashboard/event-dashboard.component';
import { LoginComponent } from './auth/components/login/login.component';
import { AuthGuard } from '@auth0/auth0-angular';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'events', component: EventDashboardComponent, canActivate: [AuthGuard] },
  { path: 'events/new', component: CreateEventComponent, canActivate: [AuthGuard] },
];

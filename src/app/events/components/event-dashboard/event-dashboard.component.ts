import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { EventService } from '../../services/event.service';
import { Event } from '../../interfaces/event.interface';

@Component({
  selector: 'app-event-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-dashboard.component.html',
  styleUrls: ['./event-dashboard.component.scss'],
})
export class EventDashboardComponent {
  events$: Observable<Event[]>;

  constructor(private eventService: EventService) {
    this.events$ = this.eventService.getEvents();
  }
}

import { Component } from '@angular/core';
import { EventFormComponent } from '../event-form/event-form.component';
import { EventifyEvent } from '../../interfaces/event.interface';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-edit-event',
  standalone: true,
  imports: [EventFormComponent],
  templateUrl: './edit-event.component.html',
  styleUrl: './edit-event.component.scss'
})
export class EditEventComponent {
  event: EventifyEvent | null = null;

  constructor(private eventService: EventService) {
    this.eventService.eventToUpdate.subscribe(e => this.event = e);
  }
}

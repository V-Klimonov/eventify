import { Component } from '@angular/core';
import { EventFormComponent } from '../event-form/event-form.component';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [EventFormComponent],
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss'],
})
export class CreateEventComponent {
  constructor() {}
}

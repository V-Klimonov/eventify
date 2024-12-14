import { Component, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EventService } from '../../services/event.service';
import { EventifyEvent } from '../../interfaces/event.interface';
import { SvgComponent } from '../../../shared/components/svg/svg.component';
import { EditEventComponent } from '../edit-event/edit-event.component';

@Component({
  selector: 'app-event-dashboard',
  standalone: true,
  imports: [CommonModule, SvgComponent, EditEventComponent],
  templateUrl: './event-dashboard.component.html',
  styleUrls: ['./event-dashboard.component.scss'],
})
export class EventDashboardComponent {
  events$: Observable<EventifyEvent[]>;
  eventMenuOpen: string | null = null;
  isEditEventOpen: boolean = false;

  constructor(private eventService: EventService, private eRef: ElementRef) {
    this.events$ = this.events$ = this.getActiveEvents();
    this.eventService.eventToUpdate.subscribe(e => this.isEditEventOpen = !!e);
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event): void {
    const targetElement = event.target as HTMLElement;

    if (this.eventMenuOpen && !targetElement.closest('.event__card__settings')) {
      this.eventMenuOpen = null;
    }
  }

  toggleMenu(eventId: string): void {
    this.eventMenuOpen = this.eventMenuOpen === eventId ? null : eventId;
  }
  
  deleteEvent(eventId: string): void {
    this.eventService.deleteEvent(eventId).subscribe(() => {
      this.events$ = this.getActiveEvents();
    });
  }
  
  editEvent(event: EventifyEvent | null = null): void {
    this.eventService.eventToUpdate.next(event);
    this.eventMenuOpen = null;
  }

  addToGoogleCalendar(event: any): void {
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.name)}&dates=${this.formatDate(event.date, event.startTime, event.endTime)}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;
    window.open(googleCalendarUrl, '_blank');
    this.eventMenuOpen = null;
  }

  formatDate(date: string, startTime: string, endTime: string): string {
    const start = new Date(`${date}T${startTime}`).toISOString().replace(/[-:]/g, '').split('.')[0];
    const end = new Date(`${date}T${endTime}`).toISOString().replace(/[-:]/g, '').split('.')[0];
    return `${start}/${end}`;
  }

  private getActiveEvents(): Observable<EventifyEvent[]> {
    return this.eventService.getEvents().pipe(
      map(events => events.filter(event => {
        const eventDate = new Date(event.date);
        const currentDate = new Date();
        return eventDate >= currentDate || (eventDate.getDate() === currentDate.getDate());
      }))
    );
  }
}

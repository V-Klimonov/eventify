import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { EventifyEvent } from '../interfaces/event.interface';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  eventToUpdate: BehaviorSubject<EventifyEvent | null> = new BehaviorSubject<EventifyEvent | null>(null);
  private eventsUrl = 'https://6749f9018680202966334853.mockapi.io/api/v1/event';

  constructor(private http: HttpClient) {}

  getEvents(): Observable<EventifyEvent[]> {
    return this.http.get<EventifyEvent[]>(this.eventsUrl);
  }

  addEvent(event: Event): Observable<EventifyEvent> {
    return this.http.post<EventifyEvent>(this.eventsUrl, event);
  }

  updateEvent(eventFormData: Event, eventId: string): Observable<EventifyEvent> {
    const url = `${this.eventsUrl}/${eventId}`;
    return this.http.put<EventifyEvent>(url, eventFormData);
  }

  deleteEvent(id: string): Observable<void> {
    const url = `${this.eventsUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  setEventToUpdate(event: EventifyEvent | null = null): void {
    this.eventToUpdate.next(event);
  }
}

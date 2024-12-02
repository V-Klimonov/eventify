import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../interfaces/event.interface';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private eventsUrl = 'https://6749f9018680202966334853.mockapi.io/api/v1/event';

  constructor(private http: HttpClient) {}

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.eventsUrl);
  }

  addEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(this.eventsUrl, event);
  }

  updateEvent(event: Event): Observable<Event> {
    const url = `${this.eventsUrl}/${event.id}`;
    return this.http.put<Event>(url, event);
  }

  deleteEvent(id: string): Observable<void> {
    const url = `${this.eventsUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}

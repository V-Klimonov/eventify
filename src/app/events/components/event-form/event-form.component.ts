import { Component, OnInit, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { EventService } from '../../services/event.service';
import { EventifyEvent } from '../../interfaces/event.interface';
import { SvgComponent } from '../../../shared/components/svg/svg.component';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, SvgComponent],
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.scss'
})
export class EventFormComponent implements OnInit {
  @Input() formType: string = 'create';
  event: EventifyEvent | null = null;
  eventForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private router: Router
  ) {
    this.eventService.eventToUpdate.subscribe(e => this.event = e);
  }

  ngOnInit(): void {
    this.prepareForm();
    this.subscribeToAllDayChanges();
  }

  closeForm(): void {
    const isEdit = this.event && this.formType === 'edit';
    
    if (isEdit) this.eventService.eventToUpdate.next(null);
    this.router.navigate(['/events']);
  }

  createEvent(): void {
    if (this.eventForm.valid) {
      this.eventService.addEvent(this.eventForm.value).subscribe({
        next: () => {
          console.log('Event created successfully');
          this.router.navigate(['/events']);
        },
        error: (err) => {
          console.error('Error creating event', err);
        },
      });
    }
  }

  updateEvent(): void {
    if (!this.event) return;

    this.eventService.updateEvent(this.eventForm.value, this.event.id).subscribe({
      next: () => {
        console.log('Event updated successfully');
        this.eventService.eventToUpdate.next(null);
        this.router.navigate(['/events']);
      },
      error: (err) => {
        console.error('Error updating event', err);
      },
    });
  }

  handleEventFormSubmit(): void {
    if (!this.eventForm.valid) return;
    this.event ? this.updateEvent() : this.createEvent();
  }

  private subscribeToAllDayChanges(): void {
    this.eventForm.get('allDay')?.valueChanges.subscribe((allDayChecked) => {
      if (allDayChecked) {
        this.setAllDayTimes();
      } else {
        this.clearTimes();
      }
    });
  }

  private prepareForm(): void {
    const isEdit = this.event && this.formType === 'edit';
    const clearEventToUpdate = this.event && this.formType === 'create';

    if (clearEventToUpdate) this.eventService.eventToUpdate.next(null);

    this.eventForm = this.fb.group({
      name: [isEdit ? this.event?.name : '', Validators.required],
      date: [isEdit ? this.event?.date : '', Validators.required],
      startTime: [isEdit ? this.event?.startTime : '', Validators.required],
      endTime: [isEdit ? this.event?.endTime : '', Validators.required],
      allDay: [isEdit ? this.event?.allDay : false],
      location: [isEdit ? this.event?.location : '', Validators.required],
      description: [isEdit ? this.event?.description : '', Validators.required],
    });
  }

  private setAllDayTimes(): void {
    this.eventForm.patchValue({
      startTime: '09:00',
      endTime: '18:00',
    });
  }

  private clearTimes(): void {
    this.eventForm.patchValue({
      startTime: '',
      endTime: '',
    });
  }
}

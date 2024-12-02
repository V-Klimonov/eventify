import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EventService } from '../../services/event.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss'],
})
export class CreateEventComponent implements OnInit {
  eventForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.eventForm = this.fb.group({
      name: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      location: ['', Validators.required],
      description: ['', Validators.required],
    });
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
}

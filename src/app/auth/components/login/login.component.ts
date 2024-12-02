import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isAuthenticated$: Observable<boolean> = this.auth.isAuthenticated$;
  isLoading$: Observable<boolean> = this.auth.isLoading$;

  constructor(public auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.handleAuthentication();
  }

  private handleAuthentication(): void {
    this.isAuthenticated$.subscribe((loggedIn) => {
      if (loggedIn) {
        this.router.navigate(['/events']);
      } else {
        this.trySilentAuthentication();
      }
    });
  }

  private trySilentAuthentication(): void {
    this.auth.getAccessTokenSilently().subscribe({
      next: () => {
        this.router.navigate(['/events']);
      },
      error: (err) => {
        console.warn('Silent login failed, prompting for login', err);
      },
    });
  }

  login(): void {
    this.auth.loginWithRedirect();
  }
}

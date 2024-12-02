import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { HeaderComponent } from './shared/components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(public auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.handleAppInitialization();
  }

  private handleAppInitialization(): void {
    if (this.isAuthCallback()) {
      this.handleAuthCallback();
    } else {
      this.checkAuthenticationAndRedirect();
    }
  }

  private isAuthCallback(): boolean {
    const searchParams = window.location.search;
    return searchParams.includes('code=') && searchParams.includes('state=');
  }

  private handleAuthCallback(): void {
    this.auth.handleRedirectCallback().subscribe({
      next: () => {
        this.checkAuthenticationAndRedirect();
      },
      error: (err) => console.error('Error handling redirect callback', err),
    });
  }

  private checkAuthenticationAndRedirect(): void {
    this.auth.isAuthenticated$.subscribe((loggedIn) => {
      if (loggedIn) this.router.navigate(['/events']);
    });
  }
}

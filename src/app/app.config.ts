import { ApplicationConfig, inject } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { provideAuth0 } from '@auth0/auth0-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideHttpClient(), 
    provideApollo(() => {
      const httpLink = inject(HttpLink);

      return {
        link: httpLink.create({
          uri: '<%= endpoint %>',
        }),
        cache: new InMemoryCache(),
      };
    }),
    provideAuth0({
      domain: 'dev-qods6nw77omczya0.us.auth0.com',
      clientId: 'C3B1dJ9iWpyp6iR0FWVKc6ytiVEoHjRo',
      authorizationParams: {
        redirect_uri: 'https://v-klimonov.github.io/eventify',
      },
    }),
  ]
};

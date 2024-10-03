import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { AppModule } from './app.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideStore } from '@ngrx/store';
import { apiInterceptor } from './api.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(AppModule),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([apiInterceptor])),
    provideStore(),
    provideStoreDevtools({
      maxAge: 25,
      autoPause: true,
      trace: false,
      traceLimit: 75,
      connectInZone: true,
    }),
  ],
};

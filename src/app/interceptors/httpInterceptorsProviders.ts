import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { tokenInterceptor } from './tokenInterceptor';
import { authorizationInterceptor } from './authorizationInterceptor';

//Define all http interceptors use in the application
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: tokenInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: authorizationInterceptor, multi: true },
];
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ConnexionService } from '../connexion/services/connexion.service';


@Injectable()
export class authorizationInterceptor implements HttpInterceptor {

    constructor(private connexionService: ConnexionService) { }

    /**
     * Refresh the access token and stores it, when an 401 error occured
     * @param request 
     * @param next 
     */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe( tap(() => {},
        (err: any) => {
            if (err instanceof HttpErrorResponse) {
                //If error = 401 then refresh token
                if (err.status == 401) {
                    this.connexionService.refreshToken().subscribe(myResult => {
                        //Save the new token
                        if(localStorage){
                          localStorage.setItem('access_token',myResult.access_token);
                          localStorage.setItem('refresh_token',myResult.refresh_token);
                          localStorage.setItem('expires_in',myResult.expires_in);
                        }
                    });
                }
            }
      }));
    }
}

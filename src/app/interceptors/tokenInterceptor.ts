import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConnexionService } from '../connexion/services/connexion.service';


@Injectable()
export class tokenInterceptor implements HttpInterceptor {
    
    constructor(private connexionService: ConnexionService) {}
    
    /**
     * Add the access token in the header, when the user is connected
     * @param req 
     * @param next 
     */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(this.connexionService.isConnected()){
            const cloneReq = req.clone({
                headers: new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('access_token')}`)
            });

            return next.handle(cloneReq);
        }else{
            return next.handle(req);
        }
    }
}

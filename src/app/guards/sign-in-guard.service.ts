import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ConnexionService } from '../connexion/services/connexion.service';

@Injectable({
  providedIn: 'root'
})
export class SignInGuardService implements CanActivate{

  constructor(private _router: Router, private connectionService: ConnexionService) { }

  /**
   * Redirect an unconnected user to the "unauthorized" page
   * @param route 
   * @param state 
   */
  canActivate(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    if(!this.connectionService.isConnected()){
      this._router.navigate(['/unauthorized']);
      return false;
    }
    return true;
  }
}

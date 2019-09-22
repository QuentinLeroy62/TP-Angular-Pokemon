import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { catchError, tap} from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const EMPTY_PAGED_DATA = {
  data: [],
  limit: 0,
  offset: 0,
};

@Injectable({
  providedIn: 'root'
})
export class ConnexionService {

  //URL is defined in the environment
  url: string = `${environment.apiUrl}`;

  constructor(private connexionService: ConnexionService, private http: HttpClient) { }

  /**
   * Connection to the application
   * @param email 
   * @param password 
   */
  connexion(email:string, password:string){
    const url : string = this.url+'/auth/login';

    const login = 
    {
      "email": email,
      "password": password
    };
  
    return this.http.post<any>(url,login,httpOptions);
  }

  /**
   * Create an account in the application
   * @param email 
   * @param password 
   */
  createAccount(email:string, password:string){
    const url : string = this.url+'/trainers';

    const login = 
    {
      "email": email,
      "password": password
    };
  
    return this.http.post<any>(url,login,httpOptions);
  }

  /**
   * Refresh the token when the access is expired
   * This function is called by the "authorizationInterceptors" when an 401 error occured
   */
  refreshToken(){
    const url : string = this.url+'/auth/refresh';

    const refresh_token = 
    {
      "refresh_token": localStorage.getItem('refresh_token'),
    };
  
    return this.http.post<any>(url,refresh_token,httpOptions);
  }

  /**
   * True : the user is log in the application
   * False : the user is not log in the application
   */
  isConnected(){
    if(localStorage.getItem('access_token')=== null){
      return false;
    } 
    return true;
  }

  /**
   * Log out the user
   */
  logOut(){
    localStorage.clear();
  }
}

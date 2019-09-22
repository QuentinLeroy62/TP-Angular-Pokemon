import { Component, OnInit } from '@angular/core';
import { ConnexionService } from './services/connexion.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {

  //Password display
  hide:boolean = true;

  constructor(private connexionService: ConnexionService, private router: Router, 
              private snackBar: MatSnackBar, private location: Location) { }

  ngOnInit() {
  }

  /**
   * Create an account with the credentials in parameters
   * @param email 
   * @param password 
   */
  createAccount(email: string, password: string){
    //Test if the password is too weak
    if(password.length >= 6){
      //Account successfully created
      this.connexionService.createAccount(email, password).subscribe(myResult => {
        this.snackBar.open('The account has been successfully created, please login in', 'Ok', {
          duration: 3000,
        });
      }, err =>{
          //Email address already exists in the database
          this.snackBar.open('Email address already exists ', 'Ok', {
            duration: 3000,
          });
      });
    }else{
      //The password is too weak
      this.snackBar.open('Password should be at least 6 characters', 'Ok', {
        duration: 3000,
      });
    }
  }

  /**
   * Try to log to the application with the credentials
   * @param email 
   * @param password 
   */
  onSubmit(email: string, password: string){
      this.connexionService.connexion(email, password).subscribe(myResult => {
        //Save the token in local storage
        if(localStorage){
          localStorage.setItem('access_token',myResult.access_token);
          localStorage.setItem('refresh_token',myResult.refresh_token);
          localStorage.setItem('expires_in',myResult.expires_in);
          this.router.navigate(['/pokedex'])
        }
      }, err =>{
          this.snackBar.open('Bad credentials', 'Ok', {
            duration: 3000,
          });
      });   
  }

  /**
   * Navigate to the home page
   */
  backHome(){
    this.location.back();
  }
}

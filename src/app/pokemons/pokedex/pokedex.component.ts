import { Component, OnInit } from '@angular/core';
import { ConnexionService } from 'src/app/connexion/services/connexion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss'],
})
export class PokedexComponent implements OnInit {

  //Id of the selected pokemon
  pokemonSelect:number;
  
  //For the status of the user
  loginIcon: string;
  isLogIn:boolean = false;

  constructor(private connectionService: ConnexionService, private router: Router) { }

  /**
   * Detemine the status of the user
   */
  ngOnInit() {
    this.isLogIn = this.connectionService.isConnected()
    this.updateIcon();
  }

  /**
   * Navigate to the team page
   */
  goTeam(){
    this.router.navigate(['/team']);
  }

  /**
   * Click on the pad
   * User connected -> logOut
   * User not connected -> navigate to the connection page
   */
  clickPad(){
    if(this.isLogIn){
      this.connectionService.logOut();
      this.isLogIn = false;
      this.updateIcon();
    }else{
      this.router.navigate(['/connexion']);
    }
  }

  /**
   * Update the pad icon, according to the user status
   */
  updateIcon(){
    if(this.isLogIn){
      this.loginIcon = 'lock';
    }else{
      this.loginIcon = 'lock_open';
    }
  }
  
  /**
   * Save the id of the pokemon selected
   * @param $event 
   */
  onClick($event){
    this.pokemonSelect = $event;
  }
}

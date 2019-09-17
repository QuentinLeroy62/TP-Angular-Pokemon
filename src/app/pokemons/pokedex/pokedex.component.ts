import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss'],
})
export class PokedexComponent implements OnInit {

  pokemonSelect:number;

  constructor() { }

  ngOnInit() {
  }

  //Récupération de l'id du pokemon sélectionné
  onClick($event){
    this.pokemonSelect = $event;
  }

}

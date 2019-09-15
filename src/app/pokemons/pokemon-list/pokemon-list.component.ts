import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';
import { PokemonService } from '../services/pokemon.service';

const NB_POKEMONS_TO_RETRIEVE: number = 20;

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {

  pokemons:Array<Pokemon> = [];

  constructor(private pokemonService: PokemonService) { }

  /* Récupération des pokemons sans le scroll infini
  getPokemons(){
    this.pokemonService.getPokemons().subscribe(myResult => this.pokemons = myResult.data);
  }*/

  getPokemons(){
    this.pokemonService.getPokemons(this.pokemons.length, NB_POKEMONS_TO_RETRIEVE).subscribe(pokemons => {
      //Permet d'ajouter les résultats à la fin du tableau
      this.pokemons = [...this.pokemons, ...pokemons.data];
		});
  }

  onScroll() {
    this.getPokemons();
  }

  ngOnInit() {
    //Recup de tous les pokemons
    this.getPokemons();
  }

}

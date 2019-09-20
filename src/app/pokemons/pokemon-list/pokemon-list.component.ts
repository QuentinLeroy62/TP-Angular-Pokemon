import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
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
  searchValue : string;
  @Output() pokemonOut = new EventEmitter<Pokemon>();

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

  //Récupère les pokemons avec param de recherche
  getPokemonsSearch(){
    this.pokemonService.getPokemonSearch(this.searchValue).subscribe(myResult => this.pokemons = myResult.data);
  }

  onScroll() {
    this.getPokemons();
  }

  onClick(pokemon:Pokemon){
    this.pokemonOut.emit(pokemon);
  }

  searchChange(){
    if(this.searchValue != ""){
      this.getPokemonsSearch();
    }
    else{
      this.pokemons = [];
      this.getPokemons();
    } 
      
  }

  ngOnInit() {
    //Recup de tous les pokemons
    this.getPokemons();
  }
}

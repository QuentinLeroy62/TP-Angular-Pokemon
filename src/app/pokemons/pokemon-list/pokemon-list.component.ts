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

  //The pokemon list
  pokemons:Array<Pokemon> = [];
  //The value of the search input
  searchValue : string;
  //Event when user selects a pokemon
  @Output() pokemonOut = new EventEmitter<Pokemon>();

  constructor(private pokemonService: PokemonService) {}

  /**
   * Get the pokemon list
   */
  ngOnInit() {
    this.getPokemons();
  }

  /**
   * Get the pokemon list
   */
  getPokemons(){
    this.pokemonService.getPokemons(this.pokemons.length, NB_POKEMONS_TO_RETRIEVE).subscribe(pokemons => {
      this.pokemons = [...this.pokemons, ...pokemons.data];
		});
  }

  /**
   * Get the pokemon which match with the search
   */
  getPokemonsSearch(){
    this.pokemonService.getPokemonSearch(this.searchValue).subscribe(myResult => this.pokemons = myResult.data);
  }

  /**
   * Get the newt part of the pokemon list
   */
  onScroll() {
    this.getPokemons();
  }

  /**
   * Emit an event with the selected pokemon
   * @param pokemon 
   */
  onClick(pokemon:Pokemon){
    this.pokemonOut.emit(pokemon);
  }

  /**
   * Trigger on OnKeyUp event
   * When user types in the search input
   */
  searchChange(){
    //When there is a search
    if(this.searchValue != ""){
      this.getPokemonsSearch();
    }
    //When there is not a search
    else{
      this.pokemons = [];
      this.getPokemons();
    }   
  }
}

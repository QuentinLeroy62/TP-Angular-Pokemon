import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { Pokemon } from '../models/pokemon.model';
import { forkJoin, Observable} from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectionList } from '@angular/material/list';
import { Location } from '@angular/common';


const NB_POKEMONS_TO_RETRIEVE: number = 20;

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  pokemonsTeam:Array<Pokemon> = [];
  pokemonsList:Array<Pokemon> = [];
  displayList:boolean = false;
  iconList:string = "add_circle";
  searchValue : string;

  constructor(private pokemonService: PokemonService, private snackBar: MatSnackBar, private location: Location) { }

  ngOnInit() {
    this.getTeam();
  }

  /**
   * Retrieve the pokemon team
   */
  getTeam(){
    //Retrieve the id and the pokemon detail
    this.pokemonService.getPokemonIdTeam().subscribe(myResult => {
      this.getPokemonFromId(myResult);
      this.getPokemons();
    })
  }

  /**
   * Retrieve the pokemon team for their id
   * @param myResult  
   */
  getPokemonFromId(myResult){
    let observables: Observable<Pokemon>[];

    observables = myResult.map(id => this.pokemonService.getPokemon(id));
    //Join the 6 pokemons
    forkJoin(observables).subscribe(myResult => {
      this.pokemonsTeam = myResult;
      //Sort the team by id ascending
      this.pokemonsTeam.sort(function(a,b){return a.id - b.id});
    });
  }

  /**
   * Get the pokemon list 
   */
  getPokemons(){
    this.pokemonService.getPokemons(this.pokemonsList.length, NB_POKEMONS_TO_RETRIEVE).subscribe(pokemons => {
      this.pokemonsList = [...this.pokemonsList, ...pokemons.data];

      let pokemonIdTeam : number[] = [];
      this.pokemonsTeam.forEach(pokemon =>{
        pokemonIdTeam.push(pokemon.id);
      })

      //Remove from the list the pokemons who are in the team 
      let pokemonListOriginal : Pokemon[] = this.pokemonsList;
      this.pokemonsList  = pokemonListOriginal.filter(item => {
        return !pokemonIdTeam.includes(item.id);
      })
		});
  }

  /**
   * Get the pokemon list which match with the search
   */
  getPokemonsSearch(){
    this.pokemonService.getPokemonSearch(this.searchValue).subscribe(myResult => this.pokemonsList = myResult.data);
  }

  /**
   * Save the changes in team
   * @param pokemon 
   */
  saveChanges(pokemon: MatSelectionList){
    //If at least one pokemon is selected
    if(typeof(pokemon._value) != "undefined"){
      //If the team capacity is ok
      if(pokemon._value.length+this.pokemonsTeam.length <= 6){
      
        //Create an array of the new pokemon id
        let newPokemonTeamId: number[] = pokemon._value.map(id => Number(id));
        
        //Old team member
        this.pokemonsTeam.forEach(element => {
          newPokemonTeamId.push(element.id);
        });
        
        //Save the new team
        this.pokemonService.setMyTeam(newPokemonTeamId).subscribe();
        this.displayList = false;
        this.iconList = "add_circle";
        this.getTeam();
      }
      else{
        this.snackBar.open('The team must be less than 6', 'Ok', {
          duration: 3000,
        });
      }
    }else{
      this.snackBar.open('You must at least select one pokemon', 'Ok', {
        duration: 3000,
      });
    }
  }

  /**
   * Delete the selected pokemon from the team
   * @param pokemonSelect 
   */
  delete(pokemonSelect:Pokemon){
    //Deletion confirmation
    if(confirm(`Are you sure to delete ${pokemonSelect.name} ?`)) {
      //Rearrange the team
      let index = this.pokemonsTeam.indexOf(pokemonSelect);
      this.pokemonsTeam.splice(index,1);
    
      //Create an array of the new pokemon id
      let newPokemonTeamId: number[] = [];
      this.pokemonsTeam.forEach(element => {
        newPokemonTeamId.push(element.id);
      });

      //Save the new team
      this.pokemonService.setMyTeam(newPokemonTeamId).subscribe();
      this.pokemonsList = [];
      this.displayList = false;
      this.iconList = "add_circle";
      this.getPokemons();
    }
  }

  /**
   * Display or the not the pokemon list
   */
  deployList(){
    if(this.displayList)
      this.iconList="add_circle";
    else
      this.iconList="highlight_off"; 
    this.displayList = !this.displayList;
  }

  /**
   * Get the next part of the pokemon list
   */
  onScroll() {
    this.getPokemons();
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
      this.pokemonsList = [];
      this.getPokemons();
    }   
  }

  /**
   * Navigate to the home page
   */
  backHome(){
    this.location.back();
  }  
}

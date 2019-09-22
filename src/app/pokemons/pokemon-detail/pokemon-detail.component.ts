import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnChanges {

  //The pokemon selected
  @Input() pokemon: Pokemon;

  constructor(private route: ActivatedRoute, 
    private pokemonService: PokemonService,
    private location: Location) { }

  /**
   * Detects a change on the input and check that the pokemon is set
   * @param changes 
   */
  ngOnChanges(changes: SimpleChanges): void {
    if(changes.pokemon && typeof(this.pokemon) != "undefined"){
      this.getPokemon();
      this.playAudio();
    }
  }

  /**
   * Get the detail of the selected pokemon
   */
  getPokemon(){
    /** No more necessary with side-by-side display
    const id: number = +this.route.snapshot.paramMap.get('id'); */
    this.pokemonService.getPokemon(this.pokemon.id).subscribe(myResult => this.pokemon = myResult);
  }

  /**
   * Play the pokemon sound
   */
  playAudio(){
    let audio = new Audio();
    audio.src = `assets/audio/${this.pokemon.id}.mp3`;
    audio.load();
    audio.play();
  }

  /**
   * Navigate to the previous page
   * No more necessary with side-by-side display
   */
  goBack(){
    this.location.back();
  } 
}

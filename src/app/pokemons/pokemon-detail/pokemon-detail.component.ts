import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';
import { Location } from '@angular/common';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnChanges {

  @Input() pokemon: Pokemon;

  constructor(private route: ActivatedRoute, 
    private pokemonService: PokemonService,
    private location: Location) { }

  getPokemon(){
    //const id: number = +this.route.snapshot.paramMap.get('id');
    this.pokemonService.getPokemon(this.pokemon.id).subscribe(myResult => this.pokemon = myResult);
  }

  goBack(){
    this.location.back();
  }

  //Détecte le changement sur l'input et vérifie que le pokemon est définie
  ngOnChanges(changes: SimpleChanges): void {
    if(changes.pokemon && typeof(this.pokemon) != "undefined"){
      this.getPokemon();
    }
  }
}

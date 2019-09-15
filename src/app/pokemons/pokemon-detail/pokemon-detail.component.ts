import { Component, OnInit, Input } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {

  @Input() pokemon: Pokemon;

  constructor(private route: ActivatedRoute, 
    private pokemonService: PokemonService,
    private location: Location) { }

  getPokemon(){
    const id: number = +this.route.snapshot.paramMap.get('id');
    this.pokemonService.getPokemon(id).subscribe(myResult => this.pokemon = myResult);
  }

  goBack(){
    this.location.back();
  }

  ngOnInit() {
    this.getPokemon();
  }

}

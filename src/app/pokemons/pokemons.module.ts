import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokemonsRoutingModule } from './pokemons-routing.module';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { HttpClientModule } from '@angular/common/http';
import { MatListModule } from '@angular/material/list';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PokedexComponent } from './pokedex/pokedex.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { TeamComponent } from './team/team.component';
import { MatDividerModule } from '@angular/material/divider'; 
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';


@NgModule({
  declarations: [PokemonListComponent, PokemonDetailComponent, PokedexComponent, TeamComponent],
  imports: [
    CommonModule,
    PokemonsRoutingModule,
    HttpClientModule,
    MatListModule, 
    MatCardModule,
    MatGridListModule,
    MatChipsModule,
    MatIconModule,
    InfiniteScrollModule,
    MatSidenavModule,
    MatInputModule,
    FormsModule,
    MatDividerModule,
    MatSelectModule,
    MatToolbarModule
  ]
})
export class PokemonsModule { }

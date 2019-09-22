import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PokemonListComponent } from './pokemons/pokemon-list/pokemon-list.component';
import { PokemonDetailComponent } from './pokemons/pokemon-detail/pokemon-detail.component';
import { PokedexComponent } from './pokemons/pokedex/pokedex.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { TeamComponent } from './pokemons/team/team.component';
import { SignInGuardService } from './guards/sign-in-guard.service';
import { UnauthorizedComponent } from './template/unauthorized/unauthorized.component';


const routes: Routes = [
  { path: '', redirectTo: '/pokedex', pathMatch: 'full'},
  { path: 'list', component: PokemonListComponent },
  { path: 'detail/:id', component: PokemonDetailComponent },
  { path: 'pokedex', component: PokedexComponent},
  { path: 'connexion', component: ConnexionComponent },
  { path: 'team', component: TeamComponent, canActivate: [SignInGuardService]},
  { path: 'unauthorized', component: UnauthorizedComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Pokemon } from '../models/pokemon.model';
import { PagedData } from '../models/paged-data.model';
import { of, Observable } from 'rxjs';
import { catchError, tap} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const EMPTY_PAGED_DATA = {
  data: [],
  limit: 0,
  offset: 0,
};

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private pokemonUrl:string = 'http://app-ec21e68e-3e55-42d7-b1ae-3eef7507a353.cleverapps.io';

  constructor(private pokemonService: PokemonService, private http: HttpClient) { }

  /* Fonction servant à la récupération des pokemons sans le scroll infini
  getPokemons(): Observable<PagedData<Pokemon>> {
    const url : string = this.pokemonUrl+'/pokemons';
    return this.http.get<PagedData<Pokemon>>(url).pipe(
      catchError(this.handleError<PagedData<Pokemon>>('getPokemons', EMPTY_PAGED_DATA))     
    );
  }*/

  //Récupération de nb_pokemons à partir de l'offset
  getPokemons(offset: number, nb_pokemons: number ): Observable<PagedData<Pokemon>> {
    const url : string = this.pokemonUrl+'/pokemons?limit='+nb_pokemons+'&offset='+offset;
    return this.http.get<PagedData<Pokemon>>(url).pipe(
      catchError(this.handleError<PagedData<Pokemon>>('getPokemons', EMPTY_PAGED_DATA))     
    );
  }

  getPokemon(id: number): Observable<Pokemon> {
    const url : string = this.pokemonUrl+'/pokemons/'+id;
    return this.http.get<Pokemon>(url).pipe(
      catchError(this.handleError<Pokemon>(`getPokemon id=${id}`, null)));
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.error(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}

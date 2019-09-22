import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Pokemon } from '../models/pokemon.model';
import { PagedData } from '../models/paged-data.model';
import { of, Observable } from 'rxjs';
import { catchError, tap} from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const EMPTY_PAGED_DATA = {
  data: [],
  limit: 0,
  offset: 0,
};

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  //URL is defined in the environment
  pokemonUrl: string = `${environment.apiUrl}`;

  constructor(private pokemonService: PokemonService, private http: HttpClient) { }

  /**
   * Get nb_pokemons from the offset
   * @param offset 
   * @param nb_pokemons 
   */
  getPokemons(offset: number, nb_pokemons: number ): Observable<PagedData<Pokemon>> {
    const url : string = this.pokemonUrl+'/pokemons?limit='+nb_pokemons+'&offset='+offset;
    return this.http.get<PagedData<Pokemon>>(url).pipe(
      catchError(this.handleError<PagedData<Pokemon>>('getPokemons', EMPTY_PAGED_DATA))     
    );
  }

  /**
   * Get one pokemon 
   * @param id
   */
  getPokemon(id: number): Observable<Pokemon> {
    const url : string = this.pokemonUrl+'/pokemons/'+id;
    return this.http.get<Pokemon>(url).pipe(
      catchError(this.handleError<Pokemon>(`getPokemon id=${id}`, null)));
  }

  /**
   * Get all pokemon which match with the search
   * @param searchParam 
   */
  getPokemonSearch(searchParam: string): Observable<PagedData<Pokemon>> {
    const url : string = this.pokemonUrl+'/pokemons?search='+searchParam;
    return this.http.get<PagedData<Pokemon>>(url).pipe(
      catchError(this.handleError<PagedData<Pokemon>>('getPokemons', EMPTY_PAGED_DATA))     
    );
  }

  /**
   * Get all id of the pokemon in the user team
   */
  getPokemonIdTeam(): Observable<number[]>{
    const url : string = this.pokemonUrl+'/trainers/me/team';
    return this.http.get<number[]>(url);
  }

  /**
   * Replace the user team by the new one
   * @param idPokemons 
   */
  setMyTeam(idPokemons: number[]){
    const url : string = this.pokemonUrl+'/trainers/me/team';
    return this.http.put<any>(url, idPokemons);
  }

  /**
   * Handle the errors on the request
   * @param operation 
   * @param result 
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}

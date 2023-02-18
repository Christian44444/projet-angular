import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Tache } from '../models/tache';

@Injectable({
  providedIn: 'root'
})
export class TacheService {
  private _baseUrl = 'http://localhost:3000/tache';

  public taches$ = new BehaviorSubject<Tache[]>([]);
  public tache$  = new BehaviorSubject<Tache>({});

  constructor(private _http: HttpClient) { };

  // GET taches
  findAll(): Observable<Tache[]> {
    return this._http
      .get<Tache[]>(this._baseUrl)
      .pipe(
        tap(taches => this.taches$.next(taches))
      );
  };
  // GET tache à faire si besoin

  // POST tache
  createOne(t: Tache): Observable<Tache> {
    return this._http
      .post<Tache>(this._baseUrl, t ) 
      .pipe(
        tap(tache => {
          const taches = this.taches$.value;
          this.taches$.next([tache, ...taches]); 
        })
      );
  };
  // PUT tache
  editOne(t: Tache): Observable<Tache> {
    return this._http
      .put<Tache>(`${this._baseUrl}/${t.id}`, t)
      .pipe(
        tap(tache => {
          const taches = this.taches$.value;
          taches.splice(taches.findIndex(ta => ta.id == tache.id),1,tache);
          this.taches$.next([...taches]);
        })
      );
  };
  //DELETE tache 
  deleteOne(t: Tache): Observable<Tache> { // Renvoie une vide : {}
    return this._http
      .delete<Tache>(`${this._baseUrl}/${t.id}`)
      .pipe(
        tap(() => {
          const taches = this.taches$.value;
          taches.splice(taches.findIndex(ta => ta.id == t.id),1);
          // Ne pas utiliser indexOf() il faut une corrélation trop grande => echec
          this.taches$.next([...taches]);
        })
      );
  };
}

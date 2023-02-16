import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Utilisateur } from '../models/utilisateur';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  private _baseUrl = 'http://localhost:3000/utilisateur';

  public utils$ = new BehaviorSubject<Utilisateur[]>([]);
  public util$  = new BehaviorSubject<Utilisateur>({});

  constructor(private _http: HttpClient) { }


  // GET utils
  findAll(): Observable<Utilisateur[]> {
    return this._http
      .get<Utilisateur[]>(this._baseUrl)
      .pipe(
        tap(utils => this.utils$.next(utils))
      );
  }

  // PUT todo
  editOne(t: Utilisateur): Observable<Utilisateur> {
    return this._http
      .put<Utilisateur>(`${this._baseUrl}/${t.id}`, t)
      .pipe(
        tap(util => {
          const utils = this.utils$.value;
          utils.splice(utils.findIndex(ut => ut.id == util.id),1,util);
          this.utils$.next([...utils]);
        })
      );
  }
  
}

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

  constructor(private _http: HttpClient) { };

  // GET utils
  findAll(): Observable<Utilisateur[]> {
    return this._http
      .get<Utilisateur[]>(this._baseUrl)
      .pipe(
        tap(utils => this.utils$.next(utils))
        // tap() ne modifie pas utils d'où son utilisation pour mettre à jour le subject
      );
  }
  // GET util à faire si besoin

  // POST util
  createOne(u: Utilisateur): Observable<Utilisateur> {
    return this._http
      .post<Utilisateur>(this._baseUrl, u ) 
      .pipe(
        tap(util => {
          const utils = this.utils$.value;
          this.utils$.next([util, ...utils]); 
          // méthode plus étalée que 
          // utils.unshift(util); 
          // this.utils$.next([...utils]); l'écriture [...utils] remplace le tableau 
          // il faut faire comme ça : passer par une variable plutôt que de traiter le subject en direct
        })
      );
  };
  // PUT util
  editOne(u: Utilisateur): Observable<Utilisateur> {
    return this._http
      .put<Utilisateur>(`${this._baseUrl}/${u.id}`, u)
      .pipe(
        tap(util => {
          const utils = this.utils$.value;
          utils.splice(utils.findIndex(ut => ut.id == util.id),1,util);
          this.utils$.next([...utils]);
        })
      );
  };
  //DELETE util 
  deleteOne(u: Utilisateur): Observable<Utilisateur> { // Renvoie un Utilisateur vide : {}
    return this._http
      .delete<Utilisateur>(`${this._baseUrl}/${u.id}`)
      .pipe(
        tap(() => {
          const utils = this.utils$.value;
          utils.splice(utils.findIndex(ut => ut.id == u.id),1);
          // Ne pas utiliser indexOf() il faut une corrélation trop grande => echec
          this.utils$.next([...utils]);
        })
      );
  };
}

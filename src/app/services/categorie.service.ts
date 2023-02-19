import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Categorie } from '../models/categorie';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  private _baseUrl = 'http://localhost:3000/categorie';

  public categs$ = new BehaviorSubject<Categorie[]>([]);
  public categ$  = new BehaviorSubject<Categorie>({});
  
  constructor(private _http: HttpClient) { };

  // GET categs
  findAll(): Observable<Categorie[]> {
    return this._http
      .get<Categorie[]>(this._baseUrl)
      .pipe(
        tap(categs => this.categs$.next(categs))
      );
  };
  // GET categ à faire si besoin
  findOne(id: string): Observable<Categorie> {
    return this._http
      .get<Categorie>(`${this._baseUrl}/${id}`)
      .pipe(
        tap(categ => this.categ$.next(categ))  
      );
  };  

  // POST categ
  createOne(c: Categorie): Observable<Categorie> {
    return this._http
      .post<Categorie>(this._baseUrl, c ) 
      .pipe(
        tap(categ => {
          const categs = this.categs$.value;
          this.categs$.next([categ, ...categs]); 
        })
      );
  };
  // PUT categ
  editOne(c: Categorie): Observable<Categorie> {
    return this._http
      .put<Categorie>(`${this._baseUrl}/${c.id}`, c)
      .pipe(
        tap(categ => {
          const categs = this.categs$.value;
          categs.splice(categs.findIndex(ca => ca.id == categ.id),1,categ);
          this.categs$.next([...categs]);
        })
      );
  };
  //DELETE categ 
  deleteOne(c: Categorie): Observable<Categorie> {
    return this._http
      .delete<Categorie>(`${this._baseUrl}/${c.id}`)
      .pipe(
        tap(() => {
          const categs = this.categs$.value;
          categs.splice(categs.findIndex(ca => ca.id == c.id),1);
          this.categs$.next([...categs]);
        })
      );
  };

}

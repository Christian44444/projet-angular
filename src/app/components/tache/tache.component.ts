import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { pipe, tap } from 'rxjs';
import { Categorie } from 'src/app/models/categorie';
import { Tache } from 'src/app/models/tache';
import { Utilisateur } from 'src/app/models/utilisateur';
import { CategorieService } from 'src/app/services/categorie.service';
import { TacheService } from 'src/app/services/tache.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-tache',
  templateUrl: './tache.component.html',
  styleUrls: ['./tache.component.css']
})
export class TacheComponent implements OnInit {
  taches$ = this._tacheService.taches$;
  tachesNonFaites$ = this._tacheService.taches$;
  tachesFaites$  = this._tacheService.taches$;
  newTache: Tache = {};
  
  utils$ = this._utilisateurService.utils$;
  util$  = this._utilisateurService.util$;
  util: Utilisateur = {};

  categs$ = this._categorieService.categs$;
  categ$  = this._categorieService.categ$;
  categ: Categorie = {};
  
  constructor(private _tacheService: TacheService, 
              private _utilisateurService: UtilisateurService,
              private _categorieService: CategorieService) {};

  ngOnInit() {
    this._tacheService.findAll().subscribe();
    this._utilisateurService.findAll().subscribe();
    this._categorieService.findAll().subscribe();
  }

  createTache(f: NgForm) {
    if (f.valid && this.util.id != null && this.util.id !="" && this.categ.id != null && this.categ.id !="") {
      this.newTache.utilisateur_id = this.util.id;
      this.newTache.categorie_id = this.categ.id;
      this.newTache.faite = false;
      this.newTache.isEditable = false;
      console.log(this.util.id);
      this._tacheService
          .createOne(this.newTache)
          .subscribe();
      f.reset();     
    } 
  };

  updateTache(t: any) {
    t.isEditable = !t.isEditable;
    this._tacheService
      .editOne(t)
      .subscribe();
  };

  majTache(t: any) {
    t.faite = !t.faite;
    this._tacheService
      .editOne(t)
      .subscribe();
  }

  deleteTache(t: Tache) {
    this._tacheService.deleteOne(t).subscribe();
  };

  selectUtil(util_id?: string ) {
    this.util.id = util_id; 
  }
  selectCateg(categ_id?: string ) {
    this.categ.id = categ_id; 
  }
  
  getUtilNom(id: string): string {
    let nom: string = "";
    this._utilisateurService.findOne(id).subscribe(() => {
      pipe(
        tap(u => nom = this.util$.value.nom + ' ' + this.util$.value.prenom)
      )
    });
    return nom;
  }
  getCatLabel(id: string): string {
    let lib: string = "";
    this._categorieService.findOne(id).subscribe(() => {
      pipe(
        tap(c => lib = this.categ$.value.libelle + '')
      )
    });
    return lib;
  }
    
}

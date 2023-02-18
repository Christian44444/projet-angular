import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Tache } from 'src/app/models/tache';
import { Utilisateur } from 'src/app/models/utilisateur';
import { TacheService } from 'src/app/services/tache.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-tache',
  templateUrl: './tache.component.html',
  styleUrls: ['./tache.component.css']
})
export class TacheComponent implements OnInit {
  taches$ = this._tacheService.taches$
  newTache: Tache = {};
  
  utils$ = this._utilisateurService.utils$;
  util: Utilisateur = {"id": "", "nom": "", "prenom": ""};
  
  constructor(private _tacheService: TacheService, private _utilisateurService: UtilisateurService) {};

  ngOnInit() {
    this._tacheService.findAll().subscribe();
  }

  createTache(f: NgForm) {
    if (f.valid ) {
      this._tacheService
          .createOne(this.newTache)
          .subscribe()
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
    
    
}

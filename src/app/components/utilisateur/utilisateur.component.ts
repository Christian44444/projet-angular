import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Utilisateur } from 'src/app/models/utilisateur';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.css']
})
export class UtilisateurComponent implements OnInit{
  utils$ = this._utilisateurService.utils$
  newUtil: Utilisateur = {};

  constructor(private _utilisateurService: UtilisateurService) {};

  ngOnInit() {
    this._utilisateurService.findAll().subscribe();
  }

  createUtil(f?: NgForm){  };
  updateUtil(u: any){
    u.isEditable = !u.isEditable;
    this._utilisateurService
      .editOne(u)
      .subscribe();
  };
  deleteUtil(u?: Utilisateur){ };
}

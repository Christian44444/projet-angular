import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Categorie } from 'src/app/models/categorie';
import { CategorieService } from 'src/app/services/categorie.service';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent {
  categs$ = this._categorieService.categs$
  newCateg: Categorie = {};

  constructor(private _categorieService: CategorieService) {};

  ngOnInit() {
    this._categorieService.findAll().subscribe();
  }

  createCateg(f: NgForm) {
    if (f.valid ) {
      this._categorieService
          .createOne(this.newCateg)
          .subscribe()
      f.reset();     
    } 
  };

  updateCateg(c: any) {
    c.isEditable = !c.isEditable;
    this._categorieService
      .editOne(c)
      .subscribe();
  };

  deleteCateg(c: Categorie) {
    this._categorieService.deleteOne(c).subscribe();
  };
}

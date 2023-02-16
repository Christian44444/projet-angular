import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { CategorieComponent } from "./components/categorie/categorie.component";
import { HomeComponent } from "./components/home/home.component";
import { TacheComponent } from "./components/tache/tache.component";
import { UtilisateurComponent } from "./components/utilisateur/utilisateur.component";

const routes: Routes = [
    { path: 'home', component: HomeComponent},
    { path: 'utilisateur', component: UtilisateurComponent},
    { path: 'categorie', component: CategorieComponent},
    { path: 'tache', component: TacheComponent},
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: '**', redirectTo: 'home'}
];
  
@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ],
})
export class AppRoutingModule{}
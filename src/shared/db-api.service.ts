//a-service...
//comandos para inyectar código en settings live templates

import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {AngularFireDatabase} from "angularfire2/database";


@Injectable()
export class DbApiService {
  // currentTourney: any = [];

  constructor(private fb: AngularFireDatabase,  private afDB: AngularFireDatabase) {

  }

  getFruits(): Observable<any> {
    return this.fb.list('alimentos/0/fruits').valueChanges();
  }

  getUsers(): Observable<any> {
    return this.fb.list('users').valueChanges();

  }

  getRecipes(): Observable<any> {
    return this.fb.list('recipes').valueChanges();
  }


  getIngredients(): Observable <any> {
    return this.fb.list('alimentos').valueChanges();
  }

  getMyRecipes(user){
    return this.fb.list('recipes').valueChanges();
  }

  pushRecipe(recipe) {
    this.afDB.database.ref('recipes/' + recipe.id).set(recipe);
  }



  // editRecipe(recipe, user){
  //   this.fb.list(`recipes/${recipe.key}`).update({
  //     name: recipe.name,
  //     ingredient: recipe.ingredients,
  //     tag: recipe.tag,
  //     user: user.email
  //
  //   }, recipe.key);
  // }


  //
  // editRecipe(recipe, user){
  //   this.fb.list(`recipes/${recipe.key}`).update({
  //     name: recipe.name,
  //     ingredient: recipe.ingredients,
  //     tag: recipe.tag,
  //     user: user.email
  //
  //   }, recipe.key);
  // }

  // getTournamentsData(tourneyId): Observable<any> {
  //   return this.fb.object(`tournaments-data/${tourneyId}`).valueChanges()
  //     .map(resp => this.currentTourney = resp);
  // }
  //
  //
  // getCurrentTourney() {
  //   return this.currentTourney;
  // }
}

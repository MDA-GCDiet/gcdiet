//a-service...
//comandos para inyectar código en settings live templates

import {Injectable} from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";
import {Observable} from "rxjs/Observable";

@Injectable()
export class DbApiService {
  currentTourney: any = [];

  constructor(private fb: AngularFireDatabase) {

  }

  getRecipes():Observable<any>{
    return this.fb.list('recipes').valueChanges();
  }

  getRecipesData(recipesId):Observable<any>{
    return this.fb.object(`recipes-data/${recipesId}`).valueChanges()
      .map(resp => this.currentTourney = resp);
  }


  getCurrentTourney(){
    return this.currentTourney;
  }
}

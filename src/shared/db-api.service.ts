//a-service...
//comandos para inyectar código en settings live templates

import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {AngularFireDatabase} from "angularfire2/database";

@Injectable()
export class DbApiService {
  // currentTourney: any = [];

  constructor(private fb: AngularFireDatabase) {
  }

  getFruits(): Observable<any> {
    return this.fb.list('fruits').valueChanges();
  }

  getUsers(): Observable<any> {
    return this.fb.list('users').valueChanges();

  }

  getRecipes(): Observable<any> {
    return this.fb.list('recipes').valueChanges();
  }

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

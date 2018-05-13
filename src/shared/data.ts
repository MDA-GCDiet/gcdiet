import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {DbApiService} from "./db-api.service";

@Injectable()
export class DataProvider {

  items: any;
  recipes: any;

  constructor(public http: Http,  private dbapi: DbApiService,) {

    // this.items = [
    //   {title: 'one'},
    //   {title: 'two'},
    //   {title: 'three'},
    //   {title: 'four'},
    //   {title: 'five'},
    //   {title: 'six'}
    // ]
    //
    // // this.items = dbapi.getRecipes();
    //
    // // this.recipes = dbapi.getRecipes();
    // //
    // //
    // // for (var i = 0; i<this.recipes.length(); i++){
    // //   this.items[i] = this.recipes[i].name;
    // // }

  }

  filterItems(searchTerm, recipes){
    return recipes.filter((item) => {
      console.log('data TS' + item);
      if (!item.name) {
        return false
      } else {
      return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
    }
    });



  }

}

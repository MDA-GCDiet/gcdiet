import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {RecipeDetailPage} from "../recipe-detail/recipe-detail";
import {RecipesPage} from "../recipes/recipes";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }


  navRecipes(){
    this.navCtrl.push(RecipesPage);
  }

}

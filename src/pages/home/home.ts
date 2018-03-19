import { Component } from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {RecipeDetailPage} from "../recipe-detail/recipe-detail";
import {RecipesPage} from "../recipes/recipes";
import {UserPage} from "../user/user";

@IonicPage()
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

  navUsers(){
    this.navCtrl.push(UserPage);
  }

}

import {Component, ViewChild} from '@angular/core';
import {IonicPage, Nav, NavController, NavParams} from 'ionic-angular';

import {RecipeDetailPage} from "../recipe-detail/recipe-detail";
import {DbApiService} from "../../shared/db-api.service";
import {MapPage} from "../map/map";
import { EditRecipePage } from '../edit-recipe/edit-recipe';

/**
 * Generated class for the RecipesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {

  @ViewChild(Nav) nav: Nav;


  recipes = [];
  fruits = [];
  ingredients = [];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private dbapi: DbApiService) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipesPage');

    this.dbapi.getRecipes().subscribe(
      (data) => this.recipes = data
    );

    this.dbapi.getRecipes().subscribe((data) =>this.ingredients = data.ingredients);

  }

  viewFruits(){
    const a = this.dbapi.getFruits().subscribe(
      (data) => this.fruits = data
    );
    console.log(a);
  }

  navRecipeDetail(recipe){
    this.navCtrl.push(RecipeDetailPage, recipe);
  }

  goToRecipes(){
    this.nav.push(RecipesPage);
  }
  goHome(){
    this.navCtrl.popToRoot();
  }

  navMap(){
    this.navCtrl.push(MapPage);
  }

  navEditRecipe() {
    this.navCtrl.push(RecipeDetailPage);
  }
}

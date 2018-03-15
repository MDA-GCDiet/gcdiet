import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {RecipeDetailPage} from "../recipe-detail/recipe-detail";
import {DbApiService} from "../../shared/db-api.service";

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
  recipes: any ;

  constructor(public navCtrl: NavController, public navParams: NavParams, private dbapi: DbApiService, private loadingController: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipesPage');

    let loader = this.loadingController.create({
      content: "Accediendo a los datos...",
      spinner: 'dots'
    });

    loader.present().then(()=>{
      this.dbapi.getRecipes().subscribe(
        (data) => {
          this.recipes = data;
          loader.dismiss();
        }
      );
    });
  }


  navRecipeDetail(recipe){
    this.navCtrl.push(RecipeDetailPage, recipe);
  }
}

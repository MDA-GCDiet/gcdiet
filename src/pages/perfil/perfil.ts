import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {DbApiService} from "../../shared/db-api.service";
import {RecipeDetailPage} from "../recipe-detail/recipe-detail";
import {CalendarPage} from "../calendar/calendar";
import {FoodPage} from "../food/food";

/**
 * Generated class for the PerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  usuario = {};
  recipes = [];
  ingredients = [];


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private afAuth: AngularFireAuth,
              private dbapi: DbApiService) {
  }

  ionViewDidLoad() {
    this.afAuth.authState.subscribe(data => {
      this.usuario = data;
      console.log(data.email);
    });

    this.dbapi.getRecipes().subscribe(
      (data) => this.recipes = data
    );
    this.dbapi.getIngredients().subscribe(
      (data) => this.ingredients = data
    );
    
    console.log('ionViewDidLoad PerfilPage');
    
    console.log(this.recipes);
  }


  navEditRecipe() {
    this.navCtrl.push(RecipeDetailPage);
    
    console.log(this.recipes);
  }

  navCalendar() {
    this.navCtrl.push(CalendarPage);
  }

  navFood() {
    this.navCtrl.push(FoodPage);
    console.log(this.ingredients);
  }

}


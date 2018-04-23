import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {DbApiService} from "../../shared/db-api.service";
import {RecipeDetailPage} from "../recipe-detail/recipe-detail";

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


  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth, private dbapi: DbApiService) {
  }

  ionViewDidLoad() {
    this.afAuth.authState.subscribe(data => {
      this.usuario = data;
      console.log(data.email);
    });

    this.dbapi.getRecipes().subscribe(
      (data) => this.recipes = data
    );
    console.log('ionViewDidLoad PerfilPage');
  }


  navEditRecipe() {
    this.navCtrl.push(RecipeDetailPage);
  }
}

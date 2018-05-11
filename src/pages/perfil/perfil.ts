import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {DbApiService} from "../../shared/db-api.service";
import {RecipeDetailPage} from "../recipe-detail/recipe-detail";
import {CalendarPage} from "../calendar/calendar";
import {stringSplice} from "@ionic/app-scripts";


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
  usermail: string;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private afAuth: AngularFireAuth,
              private dbapi: DbApiService) {
  }

  ionViewDidLoad() {
    this.afAuth.authState.subscribe(data => {
      this.usuario = data;
      this.usermail = data.email;
      // this.email =  this.usermail;
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

  navCalendar() {
    this.navCtrl.push(CalendarPage);
  }

}


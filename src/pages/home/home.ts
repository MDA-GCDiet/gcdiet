import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {RecipesPage} from "../recipes/recipes";
import { AngularFireAuth } from "angularfire2/auth";
import {LoginPage} from "../login/login";
import {PerfilPage} from "../perfil/perfil";

import {DbApiService} from "../../shared/db-api.service";
import {MapPage} from "../map/map";
import { SocialSharing } from "@ionic-native/social-sharing";



@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  usuario = {};
  recipes = [];
  ingredients = [];

  constructor(private afAuth: AngularFireAuth,
              private toast : ToastController,
              public navCtrl: NavController,
              public navParams: NavParams, private dbapi: DbApiService,
              private socialSharing: SocialSharing) {

  }

  ionViewWillLoad(){
    this.afAuth.authState.subscribe(data => {
      this.usuario = data;
      // console.log(data.email);
      if (data && data.email && data.uid) {

        this.toast.create({
          message: `Welcome to GC_Diet, ${data.email}`,
          duration: 3000
        }).present();
      }
    });

    this.dbapi.getRecipes().subscribe(
      (data) => this.recipes = data
    );
    this.dbapi.getRecipes().subscribe((data) =>this.ingredients = data.ingredients);
  }

  goToLogin() {
    this.navCtrl.push(LoginPage);
  }

  logout() {
    this.afAuth.auth.signOut().then(() =>
      this.toast.create({
        message: `Se ha cerrado sesión correctamente`,
        duration: 3000
      }).present()
    );
      this.navCtrl.setRoot(HomePage);
  }

  navRecipes(){
    this.navCtrl.push(RecipesPage);
  }

  navPerfil(){
    this.navCtrl.push(PerfilPage);
  }


  navMap(){
    this.navCtrl.push(MapPage);
  }



  facebookshare(fbmsg){
    this.socialSharing.shareViaFacebook('hola', null, null)
      .then(() =>{
        console.log("yes");
      }).catch((error) =>{
      console.log("failed posting");
    })
  }

}

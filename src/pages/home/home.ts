import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {RecipesPage} from "../recipes/recipes";
import {UserPage} from "../user/user";
import { AngularFireAuth } from "angularfire2/auth";
import {LoginPage} from "../login/login";
import {User} from "../../models/user";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  usuario = {};

  constructor(private afAuth: AngularFireAuth,
              private toast : ToastController,
              public navCtrl: NavController,
              public navParams: NavParams) {

  }

  ionViewWillLoad(){
    this.afAuth.authState.subscribe(data => {
      this.usuario = data;
      console.log(data);
      if (data && data.email && data.uid) {
        this.toast.create({
          message: `Welcome to APP_NAME, ${data.email}`,
          duration: 3000
        }).present();
      }
    });
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

  navUsers(){
    this.navCtrl.push(UserPage);
  }

}

import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {RecipesPage} from "../recipes/recipes";
import {UserPage} from "../user/user";
import { AngularFireAuth } from "angularfire2/auth";
import {ProfilePage} from "../profile/profile";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private afAuth: AngularFireAuth,
              private toast : ToastController,
              public navCtrl: NavController,
              public navParams: NavParams) {

  }

  ionViewWillLoad(){
    this.afAuth.authState.subscribe(data => {
      if (data && data.email && data.uid) {
        this.toast.create({
          message: `Welcome to APP_NAME, ${data.email}`,
          duration: 3000
        }).present();
      }
      else {
        this.toast.create({
          message: `Could not find authentication details`,
          duration: 3000
        }).present();
      }
    });
  }

  navRecipes(){
    this.navCtrl.push(RecipesPage);
  }

  navUsers(){
    this.navCtrl.push(UserPage);
  }
  navProfile() {
    this.navCtrl.push(ProfilePage);
  }
}

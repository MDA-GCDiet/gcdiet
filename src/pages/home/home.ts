import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {RecipesPage} from "../recipes/recipes";
import { AngularFireAuth } from "angularfire2/auth";

import {LoginPage} from "../login/login";
import {PerfilPage} from "../perfil/perfil";

import {DbApiService} from "../../shared/db-api.service";
import {MapPage} from "../map/map";
import { SocialSharing } from "@ionic-native/social-sharing";
import {Camera, CameraOptions} from "@ionic-native/camera";
import {EditRecipePage} from "../edit-recipe/edit-recipe";
import {RecipeDetailPage} from "../recipe-detail/recipe-detail";
import {CommentsPage} from "../comments/comments";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  usuario = {};
  recipes = [];
  ingredients = [];
  image: string = null;
  title: string = null;
  description: string = null;
  comments=new Array("");
  newComment: string=null;

  constructor(private afAuth: AngularFireAuth,
              private toast : ToastController,
              public navCtrl: NavController,
              private socialsharing: SocialSharing,
              public navParams: NavParams, private dbapi: DbApiService,
              private socialSharing: SocialSharing,
              private camera: Camera) {


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


  navRecipe(){
    this.navCtrl.push(RecipeDetailPage);
  }

  navEdit(recipe){
    this.navCtrl.push(EditRecipePage, recipe);
  }

  share(title,descr){
    this.title=title;
    this.description=descr;
    this.socialsharing.share(this.title,this.description)
      .then(() =>{

      }).catch((error) =>{

    })
  }

  getPicture(){
    const options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000,
      quality: 100
    };
    this.camera.getPicture(options)
      .then(imageData => {
        this.image = `data:image/jpeg;base64,${imageData}`;
      })
      .catch(error => {
        console.log(error);
      });
  }

  navComments(recipe){
    this.navCtrl.push(CommentsPage, recipe);
  }

}

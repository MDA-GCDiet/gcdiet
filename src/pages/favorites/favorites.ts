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


import { Storage } from '@ionic/storage';

/**
 * Generated class for the FavoritesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {

  usuario = {};
  recipes = [];
  ingredients = [];
  image: string = null;
  rate: any;
  lock: any;
  title: string = null;
  description: string = null;
  comments=new Array("");
  newComment: string=null;
  recipe:any;

  constructor(private afAuth: AngularFireAuth,
              private toast : ToastController,
              public navCtrl: NavController,
              private socialsharing: SocialSharing,
              public navParams: NavParams, private dbapi: DbApiService,
              private socialSharing: SocialSharing,
              private camera: Camera,
              public storage: Storage) {

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
    this.storage.forEach( (value, key, index) => {
      this.recipes.push(value);
    })

    // this.dbapi.getRecipes().subscribe(
    //   (data) => this.recipes = data
    // );
    // this.dbapi.getRecipes().subscribe((data) =>this.ingredients = data.ingredients);
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
      this.navCtrl.setRoot(FavoritesPage);
  }

  navRecipes(){
    this.navCtrl.push(RecipesPage);
  }

  navPerfil(){
    this.navCtrl.push(PerfilPage);
  }

  navMap(recipe){
    console.log(recipe);
    this.navCtrl.push(MapPage);
  }


  navRecipe(recipe){
    this.navCtrl.push(RecipeDetailPage, {recipe: recipe});
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
  onModelChange($event, recipe){
    if(!recipe.votes){
      recipe.votes = 1;
      recipe.points = recipe.rate;
      recipe.rate = recipe.rate;
    }else{
      recipe.votes++;
      recipe.points += recipe.rate;
      recipe.rate = recipe.points/recipe.votes;

    }
    this.lock=true;
    this.dbapi.pushRecipe(recipe);

    console.log(recipe);
    console.log(recipe);
  }

  navComments(recipe, usuario){
    this.navCtrl.push(CommentsPage, {'recipe': recipe, 'usuario': usuario});
  }

}

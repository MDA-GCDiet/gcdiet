import {Component, ViewChild} from '@angular/core';
import {IonicPage, Nav, NavController, NavParams} from 'ionic-angular';

import {RecipeDetailPage} from "../recipe-detail/recipe-detail";
import {DbApiService} from "../../shared/db-api.service";
import { SocialSharing } from '@ionic-native/social-sharing';
import {MapPage} from "../map/map";
import {AngularFireAuth} from "angularfire2/auth";
import {NewRecipePage} from "../new-recipe/new-recipe";

import { EditRecipePage } from '../edit-recipe/edit-recipe';
import {CommentsPage} from "../comments/comments";


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

  usuario = {};
  recipes = [];
  fruits = [];
  ingredients = [];
  title: string = null;
  description: string = null;
  comments=new Array("");
  newComment: string=null;

  constructor(private afAuth: AngularFireAuth,
              public navCtrl: NavController,
              public navParams: NavParams,
              private dbapi: DbApiService,
              private socialsharing: SocialSharing) {

  }

  ionViewDidLoad() {

    this.afAuth.authState.subscribe(data => {
      this.usuario = data;
      console.log(data);
    });

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

  // navRecipeDetail(recipe){
  //   this.navCtrl.push(RecipeDetailPage, recipe);
  // }

  goToRecipes(){
    this.nav.push(RecipesPage);
  }

  goHome(){
    this.navCtrl.popToRoot();
  }
  navComments(recipe){
    this.navCtrl.push(CommentsPage, recipe);
  }

  navMap(){
    this.navCtrl.push(MapPage);
  }

  navEdit(recipe){
    this.navCtrl.push(EditRecipePage, recipe);
  }


  createRecipe() {
    this.navCtrl.push(NewRecipePage);
  }
  navEditRecipe() {
    this.navCtrl.push(RecipeDetailPage);

  }

  // facebookshare(title,descr){
  //   this.socialsharing.shareViaFacebook(title,descr)
  //     .then(() =>{
  //       console.log("yes");
  //     }).catch((error) =>{
  //     console.log("failed posting");
  //   })
  // }


  share(title,descr){
    this.title=title;
    this.description=descr;
    this.socialsharing.share(this.title,this.description)
      .then(() =>{

      }).catch((error) =>{

    })
  }
}

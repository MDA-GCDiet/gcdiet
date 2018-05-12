import {Component, ViewChild} from '@angular/core';
import {IonicPage, Nav, NavController, NavParams} from 'ionic-angular';

import {RecipeDetailPage} from "../recipe-detail/recipe-detail";
import {DbApiService} from "../../shared/db-api.service";
import {MapPage} from "../map/map";
import {AngularFireAuth} from "angularfire2/auth";
import {NewRecipePage} from "../new-recipe/new-recipe";
import { EditRecipePage } from '../edit-recipe/edit-recipe';
import {CommentsPage} from "../comments/comments";
import * as _ from 'lodash';
import {FormControl} from "@angular/forms";
import {DataProvider} from "../../shared/data";
import {SocialSharing} from "@ionic-native/social-sharing";


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
  user: string = '';
  recipes = [];
  fruits = [];
  ingredients = [];
  title: string = null;
  description: string = null;
  comments=new Array("");
  newComment: string=null;
  // queryText: String = '';

  searchTerm: string = '';
  searchControl: FormControl;
  items: any;
  searching: any = false;

  constructor(private afAuth: AngularFireAuth,
              public navCtrl: NavController,
              public navParams: NavParams,
              private dbapi: DbApiService,
              private dataService: DataProvider,
              private socialsharing: SocialSharing) {
    this.searchControl = new FormControl();

  }

  ionViewDidLoad() {

    this.afAuth.authState.subscribe(data => {
      this.usuario = data;
      console.log(data);
    });

    console.log('ionViewDidLoad RecipesPage');

    this.dbapi.getRecipes().subscribe(
      (data) => {
          this.recipes = data;
          console.log(this.recipes);
          this.setFilteredItems();
      }
    );

    this.dbapi.getRecipes().subscribe((data) =>this.ingredients = data.ingredients);


    this.setFilteredItems();
    this.searchControl.valueChanges.subscribe(search  => {
      this.searching = true;
      this.setFilteredItems();
    });
  }

  onSearchInput(){
    this.searching = false;
  }

  setFilteredItems() {
    this.items = this.dataService.filterItems(this.searchTerm, this.recipes);
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
  navComments(usuario, recipe){
    this.navCtrl.push(CommentsPage, {'usuario': usuario, 'recipe': recipe});
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

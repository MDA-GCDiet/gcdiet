import { Component } from '@angular/core';
import {AlertController, IonicPage, Loading, LoadingController, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from "../../models/user";

import { HttpClient } from '@angular/common/http';

import { RecipesPage} from '../recipes/recipes';
import { createFalse } from 'typescript';
import { Storage } from '@ionic/storage';


/**
 * Generated class for the RecipeDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recipe-detail',
  templateUrl: 'recipe-detail.html',
})
export class RecipeDetailPage {

  myForm: FormGroup;
  user = {} as User;
  public loading: Loading;
  recipe:any;
  favorite:boolean;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public storage: Storage
    ) {

      this.recipe=this.navParams.get('recipe');
this.myForm = this.createMyForm();
}

private createMyForm() {
  return this.formBuilder.group({
    name: ['', Validators.required],
    ingredients: ['', Validators.required],
  });
}

  ionViewDidLoad() {
    console.log( this.navParams.get('recipe'));

  }
  ionViewWillLoad(){
    this.isFav(this.recipe);
  }

  navRecipes() {
    this.navCtrl.push(RecipesPage);
  }
  favoriteRecipe(recipe){
    console.log("recipe",recipe);
    this.storage.set(recipe.id.toString(), recipe);
    this.favorite=true;
    this.getFavorite(recipe);

  }
  unfavoriteRecipe(recipe){
    this.storage.remove(recipe.id.toString());
    this.favorite=false;
    this.getFavorite(recipe);
  }
  getFavorite(recipe){
    this.storage.get(recipe.id.toString()).then((val) => {
      console.log("value is: " , val);
    });
    console.log(this.storage);
  }
  isFav(recipe) {
    this.storage.get(recipe.id.toString()).then((value) => {
      value ? this.favorite = true : this.favorite = false
    }).catch(() => this.favorite = false);
  }
}

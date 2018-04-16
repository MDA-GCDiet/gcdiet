import { Component } from '@angular/core';
import {AlertController, IonicPage, Loading, LoadingController, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from "../../models/user";
import {AngularFireAuth} from "angularfire2/auth";
import {LoginPage} from "../login/login";

import { RecipesPage} from '../recipes/recipes';


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

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    private afAuth: AngularFireAuth,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {
this.myForm = this.createMyForm();
}

private createMyForm() {
  return this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    ingredients: ['', Validators.required],
    steps: ['', Validators.required],
  });
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipeDetailPage');
  }

  navRecipes() {
    this.navCtrl.push(RecipesPage);
  }
}

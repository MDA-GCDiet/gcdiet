import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DbApiService} from "../../shared/db-api.service";
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";

/**
 * Generated class for the EditRecipePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage {

  myForm: FormGroup;
  recipe = {};
  user = {};
  recipesRef: AngularFireList<any>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              private dbapi: DbApiService,
              private afAuth: AngularFireAuth,
              private afDB: AngularFireDatabase) {
    this.myForm = this.createMyForm();
    this.recipesRef = this.afDB.list('recipes/');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditRecipePage');
    this.recipe = this.navParams.data;
    this.afAuth.authState.subscribe(data => {
      this.user = data;
      // console.log(data.email);

    });
  }

  private createMyForm() {
    return this.formBuilder.group({
      name: ['', Validators.required],
      tag: ['', Validators.required],
      ingredients: ['', Validators.required],
    });
  }


  editRecipe(recipe){
    this.afDB.database.ref('recipes/'+recipe.id).set(recipe);
    this.navCtrl.pop();
    // this.recipesRef.update(recipe.key,{
    //   name: recipe.name,
    //   tag: recipe.tag,
    //   ingredients: recipe.ingredients
    // });
  }


}

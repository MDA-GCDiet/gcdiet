import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DbApiService} from "../../shared/db-api.service";
import {AngularFireAuth} from "angularfire2/auth";

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

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              private dbapi: DbApiService,
              private afAuth: AngularFireAuth) {
    this.myForm = this.createMyForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditRecipePage');

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
    this.dbapi.editRecipe(recipe);
    this.navCtrl.popToRoot();
  }


}

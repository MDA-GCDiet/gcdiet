import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DbApiService} from "../../shared/db-api.service";
import {AngularFireAuth} from "angularfire2/auth";

/**
 * Generated class for the NewRecipePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-recipe',
  templateUrl: 'new-recipe.html',
})
export class NewRecipePage {

  myForm: FormGroup;
  recipe = {};
  user = {};
  userEmail: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              private dbapi: DbApiService,
              private afAuth: AngularFireAuth) {
    this.myForm = this.createMyForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewRecipePage');
    this.afAuth.authState.subscribe(data => {
      this.user = data;
      this.userEmail = data.email;
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

  addRecipe(recipe){
    recipe.id = Date.now();
    recipe.user = this.userEmail;
    this.dbapi.pushRecipe(recipe);
    this.navCtrl.popToRoot();
  }

  goHome(){
    this.navCtrl.popToRoot();
  }


}

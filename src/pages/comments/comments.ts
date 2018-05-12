import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireDatabase} from "angularfire2/database";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DbApiService} from "../../shared/db-api.service";

/**
 * Generated class for the CommentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comments',
  templateUrl: 'comments.html',
})
export class CommentsPage {
  myForm: FormGroup;
  recipe: any;
  usuario: any;
  comments=[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              private afDB: AngularFireDatabase,
              private service: DbApiService) {
    this.myForm = this.createMyForm();
    this.recipe = this.navParams.get('recipe');
    this.usuario = this.navParams.get('usuario');
  }

  ionViewDidLoad() {
    console.log(this.recipe);
    console.log(this.usuario);
    console.log('ionViewDidLoad CommentsPage');
    this.service.getComments(this.recipe.id).subscribe(data => this.comments = data);
    console.log(this.comments);
  }
  private createMyForm() {
    return this.formBuilder.group({
      comment: ['', Validators.required]
    });
  }
  addComment(recipe) {
    console.log("recipe", recipe);
    console.log("this.recipes", this.recipe);
    //recipe.comments[]=recipe.newComment;
    // recipe.comments.
    if(recipe.comments[0]==""){
      recipe.comments.pop();
      recipe.comments.push(recipe.newComment);
    }else{
      recipe.comments.push(recipe.newComment);
    }
    recipe.newComment=null;

    this.afDB.database.ref('recipes/'+recipe.id).set(recipe);
  }
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HomePage} from '../home/home';

/**
 * Generated class for the FoodPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-food',
  templateUrl: 'food.html',
})
export class FoodPage {

  myForm: FormGroup;
  ingredient = {};
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder) {
    this.myForm = this.createMyForm();
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad FoodPage');
  }
  private createMyForm() {
    return this.formBuilder.group({
      calories: ['', Validators.required],
      name: ['', Validators.required],
      vitamins: ['', Validators.required],
    });
  }

  goHome(){
    this.navCtrl.popToRoot();
  }

}

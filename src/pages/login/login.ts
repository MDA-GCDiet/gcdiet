import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HomePage} from "../home/home";
import {RegisterPage} from "../register/register";
import {MyFormPage} from "../form/form";



@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  username: string;
  password: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  SignUp() {

  }

  SignIn() {
    this.navCtrl.push(MyFormPage);
  }

  goHome() {
    this.navCtrl.push(HomePage);
  }
}

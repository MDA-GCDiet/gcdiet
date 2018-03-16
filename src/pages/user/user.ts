import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DbApiService} from "../../shared/db-api.service";

/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {
  users = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private dbapi: DbApiService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage');
    return this.dbapi.getUsers().subscribe(
      (data) => this.users = data
    );
  }

}

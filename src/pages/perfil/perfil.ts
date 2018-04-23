import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams, AlertController} from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {DbApiService} from "../../shared/db-api.service";
import {RecipeDetailPage} from "../recipe-detail/recipe-detail";
import * as moment from 'moment';

/**
 * Generated class for the PerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  usuario = {};
  recipes = [];
  eventSource = [];
  selectedDay = new Date();

  calendar = {
    mode: 'month',
    currentDate: new Date()
  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private afAuth: AngularFireAuth,
              private dbapi: DbApiService,
              private modalCtrl: ModalController,
              private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    this.afAuth.authState.subscribe(data => {
      this.usuario = data;
      console.log(data.email);
    });

    this.dbapi.getRecipes().subscribe(
      (data) => this.recipes = data
    );
    console.log('ionViewDidLoad PerfilPage');
  }


  navEditRecipe() {
    this.navCtrl.push(RecipeDetailPage);
  }

  addEvent() {
    let modal = this.modalCtrl.create('EventModalPage', {selectedDay: this.selectedDay});
    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
        let eventData = data;

        eventData.startTime = new Date(data.startTime);
        eventData.endTime = new Date(data.endTime);

        let events = this.eventSource;
        events.push(eventData);
        this.eventSource = [];
        setTimeout(() => {
          this.eventSource = events;
        });
      }
    });
  }

  onEventSelected(event) {
    let start = moment(event.startTime).format('LLLL');
    let end = moment(event.endTime).format('LLLL');

    let alert = this.alertCtrl.create({
      title: '' + event.title,
      subTitle: 'From: ' + start + '<br>To: ' + end,
      buttons: ['OK']
    });
    alert.present();
  }

  onTimeSelected(ev) {
    this.selectedDay = ev.selectedTime;
  }

}

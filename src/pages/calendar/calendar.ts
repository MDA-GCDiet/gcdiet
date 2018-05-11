import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AddEventPage } from '../add-event/add-event';
import { EditEventPage } from '../edit-event/edit-event';
import { Calendar } from '@ionic-native/calendar';

@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html'
})
export class CalendarPage {

  constructor(private alertCtrl: AlertController,
              public navCtrl: NavController,
              private calendar: Calendar) {}

  ionViewWillEnter() {
  }

  addEvent() {
    this.navCtrl.push(AddEventPage);
  }

}

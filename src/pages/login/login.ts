import { Component } from '@angular/core';
import {AlertController, IonicPage, Loading, LoadingController, NavController, NavParams} from 'ionic-angular';
import {HomePage} from "../home/home";
import {RegisterPage} from "../register/register";
import {User} from "../../models/user";
import {AngularFireAuth} from "angularfire2/auth";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;
  public loading: Loading;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private afAuth: AngularFireAuth,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.afAuth.authState.subscribe(data => {
      console.log(data);
    });
  }

  login(user: User) {
      this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password).then(() => {
        this.navCtrl.setRoot(HomePage);
        }, (err) => {
        this.loading.dismiss().then( ()=>{
          let alert = this.alertCtrl.create({
            message: err.message,
            buttons: [
              {
                text: "OK",
                role: 'cancel'
              }
            ]
          });
          alert.present();
        });
        });

      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
        });
      this.loading.present();
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  SignUp() {
    this.navCtrl.push(RegisterPage);
  }

}

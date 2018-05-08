import {Component} from '@angular/core';
import {AlertController, IonicPage, Loading, LoadingController, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from "../../models/user";
import {AngularFireAuth} from "angularfire2/auth";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  myForm: FormGroup;
  user = {} as User;
  public loading: Loading;

  constructor(public navCtrl: NavController,

              public navParams: NavParams,
              public formBuilder: FormBuilder,
              private afAuth: AngularFireAuth,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController) {
    this.myForm = this.createMyForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  private createMyForm() {
    return this.formBuilder.group({
      email: ['', Validators.required],
      passwordRetry: this.formBuilder.group({
        password: ['', Validators.required],
        passwordConfirmation: ['', Validators.required]
      }),
    });
  }

  register(user: User) {
    this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password).then(() => {
      this.navCtrl.popToRoot();
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
  };
}

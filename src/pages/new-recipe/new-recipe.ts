import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DbApiService} from "../../shared/db-api.service";
import {AngularFireAuth} from "angularfire2/auth";
import {Camera, CameraOptions} from "@ionic-native/camera";

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
  image: string = null;
  picData: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              private dbapi: DbApiService,
              private afAuth: AngularFireAuth,
              private camera: Camera) {
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
      ingredients: ['', Validators.required]
    });
  }

  addRecipe(recipe) {
    recipe.id = Date.now();
    recipe.user = this.userEmail;
    this.dbapi.pushRecipe(recipe);
    this.navCtrl.popToRoot();
  }

  goHome() {
    this.navCtrl.popToRoot();
  }

  getPicture(){
    this.camera.getPicture({
      quality:100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      correctOrientation: true,
      encodingType: this.camera.EncodingType.JPEG,
      saveToPhotoAlbum: true,
    }).then(imgData =>{
      this.picData = imgData;
      /*this.upload();*/
    })
  }

/*  upload(){
    this.picName = this.uid()+'.jpeg';
    this.myPicRef.child(this.picName)
      .putString(this.picData, 'base64',{contentType:'image/png'})
      .then(savepic =>{
        this.picUrl = savepic;
        console.log(this.picUrl);
        this.getPhoto(this.picName);
      });
  }*/

}

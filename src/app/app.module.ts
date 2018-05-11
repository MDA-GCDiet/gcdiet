import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {Calendar} from "@ionic-native/calendar";

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {RecipeDetailPage} from "../pages/recipe-detail/recipe-detail";
import {RecipesPage} from "../pages/recipes/recipes";
import {AngularFireDatabase, AngularFireDatabaseModule} from "angularfire2/database";
import {AngularFireModule} from "angularfire2";
import {AngularFireAuthModule} from "angularfire2/auth/auth.module";
import {DbApiService} from "../shared/db-api.service";
import {UserService} from "../shared/user-service";
import {UserPage} from "../pages/user/user";
import {LoginPage} from "../pages/login/login";
import {MapPage} from "../pages/map/map";
import {RegisterPage} from "../pages/register/register";
import {AgmCoreModule} from "@agm/core"

import {NewRecipePage} from "../pages/new-recipe/new-recipe";
import {PerfilPage} from "../pages/perfil/perfil";

import {CalendarPage} from "../pages/calendar/calendar";
import {FoodPage} from "../pages/food/food";

import {EditRecipePage} from "../pages/edit-recipe/edit-recipe";
import {AddEventPage} from "../pages/add-event/add-event";

import {Camera} from "@ionic-native/camera";

import {CommentsPage} from "../pages/comments/comments";

import {CustomerEmailFilter} from "../shared/filter-pipe.pipe";
// import {MyFilterPipe} from "../shared/filter-pipe.pipe";


export const FirebaseConfig = {
  apiKey: "AIzaSyA1QKO_9r_1r6UzNrv-FZxxDd_wS861YHs",
  authDomain: "gc-diet.firebaseapp.com",
  databaseURL: "https://gc-diet.firebaseio.com",
  projectId: "gc-diet",
  storageBucket: "gc-diet.appspot.com",
  messagingSenderId: "648543292007"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RecipeDetailPage,
    RecipesPage,
    UserPage,
    LoginPage,
    MapPage,
    RegisterPage,
    NewRecipePage,
    PerfilPage,
    CalendarPage,
    FoodPage,
    AddEventPage,
    EditRecipePage,

    CommentsPage,
    // MyFilterPipe
    CustomerEmailFilter

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FirebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyA1QKO_9r_1r6UzNrv-FZxxDd_wS861YHs' })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RecipeDetailPage,
    RecipesPage,
    UserPage,
    LoginPage,
    MapPage,
    RegisterPage,
    NewRecipePage,
    PerfilPage,
    CalendarPage,
    FoodPage,
    AddEventPage,
    EditRecipePage,
    CommentsPage,
    AddEventPage


  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AngularFireDatabase,
    DbApiService,
    UserService,
    Calendar,
    SocialSharing,
    Camera
  ]
})

export class AppModule {
}

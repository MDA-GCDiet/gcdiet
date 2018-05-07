import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FoodPage } from './food';

@NgModule({
  declarations: [
    FoodPage,
  ],
  imports: [
    IonicPageModule.forChild(FoodPage),
  ],
})
export class FoodPageModule {}

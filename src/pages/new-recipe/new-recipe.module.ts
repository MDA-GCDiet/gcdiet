import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewRecipePage } from './new-recipe';

@NgModule({
  declarations: [
    NewRecipePage,
  ],
  imports: [
    IonicPageModule.forChild(NewRecipePage),
  ],
})
export class NewRecipePageModule {}

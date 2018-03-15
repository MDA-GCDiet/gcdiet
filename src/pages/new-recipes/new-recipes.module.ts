import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewRecipesPage } from './new-recipes';

@NgModule({
  declarations: [
    NewRecipesPage,
  ],
  imports: [
    IonicPageModule.forChild(NewRecipesPage),
  ],
})
export class NewRecipesPageModule {}


import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyFormPage } from './form';

@NgModule({
  declarations: [
    MyFormPage,
  ],
  imports: [
    IonicPageModule.forChild(MyFormPage),
  ],
})
export class FormPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PhProfilePage } from './ph-profile';

@NgModule({
  declarations: [
    PhProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(PhProfilePage),
  ],
})
export class PhProfilePageModule {}

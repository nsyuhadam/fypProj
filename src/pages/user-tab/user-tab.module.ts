import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserTabPage } from './user-tab';

@NgModule({
  declarations: [
    UserTabPage,
  ],
  imports: [
    IonicPageModule.forChild(UserTabPage),
  ],
})
export class UserTabPageModule {}

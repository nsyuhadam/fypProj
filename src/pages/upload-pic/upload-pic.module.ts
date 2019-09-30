import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UploadPicPage } from './upload-pic';

@NgModule({
  declarations: [
    UploadPicPage,
  ],
  imports: [
    IonicPageModule.forChild(UploadPicPage),
  ],
})
export class UploadPicPageModule {}

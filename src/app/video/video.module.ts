import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideoRoutingModule } from './video-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ManageComponent } from '../manage/manage.component';
import { UploadComponent } from '../upload/upload.component';
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations: [
    UploadComponent,
    EditComponent,
    ManageComponent
  ],
  imports: [
    CommonModule,
    VideoRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class VideoModule { }

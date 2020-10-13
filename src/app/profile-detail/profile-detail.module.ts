import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileDetailPageRoutingModule } from './profile-detail-routing.module';

import { ProfileDetailPage } from './profile-detail.page';
import { ProfileModule } from '../profile/profile.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileModule,
    ProfileDetailPageRoutingModule,
  ],
  declarations: [ProfileDetailPage]
})
export class ProfileDetailPageModule {}

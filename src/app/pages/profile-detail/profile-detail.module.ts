import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProfileModule } from '@app/components/profile/profile.module';
import { IonicModule } from '@ionic/angular';
import { ProfileDetailPageRoutingModule } from './profile-detail-routing.module';
import { ProfileDetailPage } from './profile-detail.page';



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

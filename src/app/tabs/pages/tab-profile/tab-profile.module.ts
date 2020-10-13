import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProfileModule } from '@app/components/profile/profile.module';
import { IonicModule } from '@ionic/angular';
import { TabProfilePageRoutingModule } from './tab-profile-routing.module';
import { TabProfilePage } from './tab-profile.page';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: TabProfilePage }]),
    TabProfilePageRoutingModule,
    ProfileModule
  ],
  declarations: [TabProfilePage],
})
export class TabProfilePageModule { }

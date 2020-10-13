import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab-profile.page';
import { Tab3PageRoutingModule } from './tab-profile-routing.module';
import { ProfileModule } from '../profile/profile.module'

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab3Page }]),
    Tab3PageRoutingModule,
    ProfileModule
  ],
  declarations: [Tab3Page],
})
export class Tab3PageModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CenterContentModule } from '../center-content/center-content.module';
import { RantModule } from '../rant/rant.module';
import { Tab1PageRoutingModule } from './tab-rants-routing.module';
import { Tab1Page } from './tab-rants.page';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab1PageRoutingModule,
    RantModule,
    CenterContentModule,
  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule { }

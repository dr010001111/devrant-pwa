import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CenterContentComponent } from './center-content.component';



@NgModule({
  declarations: [CenterContentComponent],
  imports: [
    IonicModule,
    CommonModule
  ],
  exports: [CenterContentComponent]
})
export class CenterContentModule { }

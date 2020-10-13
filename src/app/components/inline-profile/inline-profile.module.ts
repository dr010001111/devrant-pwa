import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { InlineProfileComponent } from './inline-profile.component';



@NgModule({
  declarations: [InlineProfileComponent],
  imports: [
    IonicModule,
    CommonModule,
    RouterModule
  ],
  exports: [InlineProfileComponent]
})
export class InlineProfileModule { }

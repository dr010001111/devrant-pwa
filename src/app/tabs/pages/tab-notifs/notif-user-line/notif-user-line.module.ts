import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { InlineProfileComponent as NotifUserLineComponent } from './notif-user-line.component';



@NgModule({
  declarations: [NotifUserLineComponent],
  imports: [
    IonicModule,
    CommonModule,
    RouterModule
  ],
  exports: [NotifUserLineComponent]
})
export class NotifUserLineModule { }

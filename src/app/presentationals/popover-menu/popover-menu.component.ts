import { Component, OnInit, ChangeDetectionStrategy, HostBinding, HostListener } from '@angular/core';
import { DevRantService } from '@services/devrant.service';
import { PopoverController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-popover-menu',
  templateUrl: './popover-menu.component.html',
  styleUrls: ['./popover-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopoverMenuComponent {

  constructor(
    private devrant: DevRantService,
    public viewCtrl: PopoverController,
    private alert: AlertController
  ) { }

  @HostListener('click')
  onClick() {
    this.viewCtrl.dismiss()
  }

  async logoutClick() {
    const alert = await this.alert.create({
      header: 'Sign out',
      message: 'Do you really want to sign out?',
      buttons: [
        'No',
        {
          text: 'Sign out',
          handler: () => this.devrant.logout(),
        },
      ],
    });

    alert.present();
  }

}

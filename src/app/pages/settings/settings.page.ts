import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ColorPickerComponent } from '@app/generic/color-picker/color-picker.component';
import { ActionSheetController, PopoverController } from '@ionic/angular';
import { ConfigService } from '@services/config.service';
import { DevRantService } from '@services/devrant.service';
import { toPascalCase } from 'js-convert-case';
import { AlertService } from '@services/alert.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss'],
})
export class SettingsPageComponent implements OnInit {
    params: Params;

    constructor(
        private route: ActivatedRoute,
        readonly devrant: DevRantService,
        readonly alert: AlertService,
        readonly configService: ConfigService,
        private readonly actionSheetController: ActionSheetController,
        public popoverController: PopoverController
    ) { }

    applyTheme(newScheme) {
        this.configService.scheme = newScheme;
    }

    async showLightnessSheet() {
        const schemes = ['auto', 'light', 'dark', 'devrant-dark', 'colorful', 'custom'];

        const actionSheet = await this.actionSheetController.create({
            buttons: schemes.map(
                scheme => ({
                    text: toPascalCase(scheme),
                    role: this.configService.scheme === scheme ? 'selected' : undefined,
                    handler: () => {
                        switch (scheme) {
                            case 'custom':
                                this.presentPopover()
                                break;
                            case 'colorful':
                                if (!this.devrant.isSignedIn) {
                                    this.alert.genericAlert(
                                        'Invalid selection',
                                        'This mode is only applicable if signed in. No changes where made.'
                                    )
                                } else {
                                    this.applyTheme(this.devrant.profileColor)
                                }
                                break;
                            default:
                                this.applyTheme(scheme)
                        }
                    }
                })
            )
        });
        await actionSheet.present();
    }

    async showAccentSheet() {
        const schemes = ['inherit', 'custom'];

        const actionSheet = await this.actionSheetController.create({
            buttons: schemes.map(
                scheme => ({
                    text: toPascalCase(scheme),
                    role: this.configService.scheme === scheme ? 'selected' : undefined,
                    handler: () => {
                        switch (scheme) {
                            case 'custom':
                                this.presentPopover()
                                break;
                            default:
                                this.applyTheme(scheme)
                        }
                    }
                })
            )
        });
        await actionSheet.present();
    }

    async presentPopover() {
        const popover = await this.popoverController.create({
            component: ColorPickerComponent,
            translucent: true
        });
        return await popover.present();
    }

    ngOnInit() {
        this.params = this.route.snapshot.params;
    }
}

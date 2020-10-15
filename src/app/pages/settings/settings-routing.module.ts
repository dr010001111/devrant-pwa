import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsPageComponent } from './settings.page';

const routes: Routes = [
    {
        path: '',
        component: SettingsPageComponent,
    },
    {
        path: 'notifs',
        loadChildren: () =>
            import('./pages/notifications/notifications.module').then(
                (m) => m.NotificationsPageModule
            ),
    },
    {
        path: 'appearance',
        loadChildren: () =>
            import('./pages/appearance/appearance.module').then(
                (m) => m.AppearancePageModule
            ),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SettingsPageRoutingModule {}

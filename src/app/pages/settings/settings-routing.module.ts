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
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SettingsPageRoutingModule { }

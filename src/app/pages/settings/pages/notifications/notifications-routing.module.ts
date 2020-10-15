import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotificationsPageComponent } from './notifications.page';

const routes: Routes = [
    {
        path: '',
        component: NotificationsPageComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class NotificationsPageRoutingModule {}

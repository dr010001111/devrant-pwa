import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileDetailPageComponent } from './profile-detail.page';

const routes: Routes = [
    {
        path: ':userId',
        component: ProfileDetailPageComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProfileDetailPageRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabProfilePageComponent } from './tab-profile.page';

const routes: Routes = [
    {
        path: '',
        component: TabProfilePageComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TabProfilePageRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabNotifsPageComponent } from './tab-notifs.page';

const routes: Routes = [
    {
        path: '',
        component: TabNotifsPageComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TabNotifsPageRoutingModule {}

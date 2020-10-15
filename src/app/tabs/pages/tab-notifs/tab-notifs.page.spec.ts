import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { TabNotifsPageComponent } from './tab-notifs.page';

describe('Tab2Page', () => {
    let component: TabNotifsPageComponent;
    let fixture: ComponentFixture<TabNotifsPageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TabNotifsPageComponent],
            imports: [IonicModule.forRoot(), ExploreContainerComponentModule],
        }).compileComponents();

        fixture = TestBed.createComponent(TabNotifsPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

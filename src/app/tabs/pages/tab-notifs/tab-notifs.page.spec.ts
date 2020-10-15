import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { TabNotifsPage } from './tab-notifs.page';

describe('Tab2Page', () => {
    let component: TabNotifsPage;
    let fixture: ComponentFixture<TabNotifsPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TabNotifsPage],
            imports: [IonicModule.forRoot(), ExploreContainerComponentModule],
        }).compileComponents();

        fixture = TestBed.createComponent(TabNotifsPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

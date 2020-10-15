import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { TabFeedPageComponent } from './tab-feed.page';

describe('Tab1Page', () => {
    let component: TabFeedPageComponent;
    let fixture: ComponentFixture<TabFeedPageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TabFeedPageComponent],
            imports: [IonicModule.forRoot(), ExploreContainerComponentModule],
        }).compileComponents();

        fixture = TestBed.createComponent(TabFeedPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

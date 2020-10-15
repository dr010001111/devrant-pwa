import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { TabProfilePageComponent } from './tab-profile.page';

describe('Tab3Page', () => {
    let component: TabProfilePageComponent;
    let fixture: ComponentFixture<TabProfilePageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TabProfilePageComponent],
            imports: [IonicModule.forRoot(), ExploreContainerComponentModule],
        }).compileComponents();

        fixture = TestBed.createComponent(TabProfilePageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

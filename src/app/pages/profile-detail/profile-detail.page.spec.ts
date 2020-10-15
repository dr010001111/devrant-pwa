import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProfileDetailPageComponent } from './profile-detail.page';

describe('ProfileDetailPage', () => {
    let component: ProfileDetailPageComponent;
    let fixture: ComponentFixture<ProfileDetailPageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProfileDetailPageComponent],
            imports: [IonicModule.forRoot()],
        }).compileComponents();

        fixture = TestBed.createComponent(ProfileDetailPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

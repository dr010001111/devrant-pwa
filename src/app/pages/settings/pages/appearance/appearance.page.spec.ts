import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AppearancePageComponent } from './appearance.page';

describe('AppearancePage', () => {
    let component: AppearancePageComponent;
    let fixture: ComponentFixture<AppearancePageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AppearancePageComponent],
            imports: [IonicModule.forRoot()],
        }).compileComponents();

        fixture = TestBed.createComponent(AppearancePageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

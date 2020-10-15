import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NotificationsPageComponent } from './notifications.page';

describe('NotificationsPage', () => {
    let component: NotificationsPageComponent;
    let fixture: ComponentFixture<NotificationsPageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NotificationsPageComponent],
            imports: [IonicModule.forRoot()],
        }).compileComponents();

        fixture = TestBed.createComponent(NotificationsPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

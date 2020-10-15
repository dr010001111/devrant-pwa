import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RantDetailPageComponent } from './rant-detail.page';

describe('RantDetailPage', () => {
    let component: RantDetailPageComponent;
    let fixture: ComponentFixture<RantDetailPageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RantDetailPageComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RantDetailPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

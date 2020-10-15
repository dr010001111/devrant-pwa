import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RantDetailPage } from './rant-detail.page';

describe('RantDetailPage', () => {
    let component: RantDetailPage;
    let fixture: ComponentFixture<RantDetailPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RantDetailPage],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RantDetailPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

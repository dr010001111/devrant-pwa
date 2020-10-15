import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RantCommentComponent } from './rant-comment.component';

describe('RantCommentComponent', () => {
    let component: RantCommentComponent;
    let fixture: ComponentFixture<RantCommentComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RantCommentComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RantCommentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

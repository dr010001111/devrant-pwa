import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterContentComponent } from './center-content.component';

describe('CenterContentComponent', () => {
  let component: CenterContentComponent;
  let fixture: ComponentFixture<CenterContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CenterContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CenterContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

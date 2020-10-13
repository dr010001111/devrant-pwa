import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RantComponent } from './rant.component';

describe('RantComponent', () => {
  let component: RantComponent;
  let fixture: ComponentFixture<RantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

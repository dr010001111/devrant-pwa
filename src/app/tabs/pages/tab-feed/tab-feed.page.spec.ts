import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { TabFeedPage } from './tab-feed.page';

describe('Tab1Page', () => {
  let component: TabFeedPage;
  let fixture: ComponentFixture<TabFeedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabFeedPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(TabFeedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

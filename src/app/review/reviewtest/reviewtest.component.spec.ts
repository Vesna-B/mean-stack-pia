import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewtestComponent } from './reviewtest.component';

describe('ReviewtestComponent', () => {
  let component: ReviewtestComponent;
  let fixture: ComponentFixture<ReviewtestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewtestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewtestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

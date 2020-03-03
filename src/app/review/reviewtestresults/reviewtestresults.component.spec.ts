import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewtestresultsComponent } from './reviewtestresults.component';

describe('ReviewtestresultsComponent', () => {
  let component: ReviewtestresultsComponent;
  let fixture: ComponentFixture<ReviewtestresultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewtestresultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewtestresultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

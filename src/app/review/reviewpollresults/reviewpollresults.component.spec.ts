import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewpollresultsComponent } from './reviewpollresults.component';

describe('ReviewpollresultsComponent', () => {
  let component: ReviewpollresultsComponent;
  let fixture: ComponentFixture<ReviewpollresultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewpollresultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewpollresultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewpollComponent } from './reviewpoll.component';

describe('ReviewpollComponent', () => {
  let component: ReviewpollComponent;
  let fixture: ComponentFixture<ReviewpollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewpollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewpollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

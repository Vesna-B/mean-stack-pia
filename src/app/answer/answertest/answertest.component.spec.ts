import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswertestComponent } from './answertest.component';

describe('AnswertestComponent', () => {
  let component: AnswertestComponent;
  let fixture: ComponentFixture<AnswertestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnswertestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswertestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerpollComponent } from './answerpoll.component';

describe('AnswerpollComponent', () => {
  let component: AnswerpollComponent;
  let fixture: ComponentFixture<AnswerpollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnswerpollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerpollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

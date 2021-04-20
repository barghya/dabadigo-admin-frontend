import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripBypassMainComponent } from './trip-bypass-main.component';

describe('TripBypassMainComponent', () => {
  let component: TripBypassMainComponent;
  let fixture: ComponentFixture<TripBypassMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripBypassMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripBypassMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupsMainComponent } from './setups-main.component';

describe('SetupsMainComponent', () => {
  let component: SetupsMainComponent;
  let fixture: ComponentFixture<SetupsMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetupsMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

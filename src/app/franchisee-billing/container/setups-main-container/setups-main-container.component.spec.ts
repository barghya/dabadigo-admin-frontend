import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupsMainContainerComponent } from './setups-main-container.component';

describe('SetupsMainContainerComponent', () => {
  let component: SetupsMainContainerComponent;
  let fixture: ComponentFixture<SetupsMainContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetupsMainContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupsMainContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

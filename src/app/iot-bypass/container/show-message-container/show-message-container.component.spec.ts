import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMessageContainerComponent } from './show-message-container.component';

describe('ShowMessageContainerComponent', () => {
  let component: ShowMessageContainerComponent;
  let fixture: ComponentFixture<ShowMessageContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowMessageContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowMessageContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

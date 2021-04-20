import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartMainContainerComponent } from './part-main-container.component';

describe('PartMainContainerComponent', () => {
  let component: PartMainContainerComponent;
  let fixture: ComponentFixture<PartMainContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartMainContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartMainContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

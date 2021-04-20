import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartsMasterMainContainerComponent } from './parts-master-main-container.component';

describe('PartsMasterMainContainerComponent', () => {
  let component: PartsMasterMainContainerComponent;
  let fixture: ComponentFixture<PartsMasterMainContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartsMasterMainContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartsMasterMainContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

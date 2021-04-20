import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartsMasterModifyContainerComponent } from './parts-master-modify-container.component';

describe('PartsMasterModifyContainerComponent', () => {
  let component: PartsMasterModifyContainerComponent;
  let fixture: ComponentFixture<PartsMasterModifyContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartsMasterModifyContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartsMasterModifyContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FsqAssignRegionContainerComponent } from './fsq-assign-region-container.component';

describe('FsqAssignRegionContainerComponent', () => {
  let component: FsqAssignRegionContainerComponent;
  let fixture: ComponentFixture<FsqAssignRegionContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FsqAssignRegionContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FsqAssignRegionContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

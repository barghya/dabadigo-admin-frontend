import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FsqAssignRegionComponent } from './fsq-assign-region.component';

describe('FsqAssignRegionComponent', () => {
  let component: FsqAssignRegionComponent;
  let fixture: ComponentFixture<FsqAssignRegionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FsqAssignRegionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FsqAssignRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

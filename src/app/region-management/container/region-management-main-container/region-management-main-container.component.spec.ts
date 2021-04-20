import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionManagementMainContainerComponent } from './region-management-main-container.component';

describe('RegionManagementMainContainerComponent', () => {
  let component: RegionManagementMainContainerComponent;
  let fixture: ComponentFixture<RegionManagementMainContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegionManagementMainContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionManagementMainContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

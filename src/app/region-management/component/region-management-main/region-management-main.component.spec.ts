import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionManagementMainComponent } from './region-management-main.component';

describe('RegionManagementMainComponent', () => {
  let component: RegionManagementMainComponent;
  let fixture: ComponentFixture<RegionManagementMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegionManagementMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionManagementMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

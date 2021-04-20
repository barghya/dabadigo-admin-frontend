import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchiseManagementAssetPageComponent } from './franchise-management-asset-page.component';

describe('FranchiseManagementAssetPageComponent', () => {
  let component: FranchiseManagementAssetPageComponent;
  let fixture: ComponentFixture<FranchiseManagementAssetPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FranchiseManagementAssetPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FranchiseManagementAssetPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

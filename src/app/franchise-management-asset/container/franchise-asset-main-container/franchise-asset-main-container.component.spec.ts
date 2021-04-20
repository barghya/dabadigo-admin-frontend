import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchiseAssetMainContainerComponent } from './franchise-asset-main-container.component';

describe('FranchiseAssetMainContainerComponent', () => {
  let component: FranchiseAssetMainContainerComponent;
  let fixture: ComponentFixture<FranchiseAssetMainContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FranchiseAssetMainContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FranchiseAssetMainContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

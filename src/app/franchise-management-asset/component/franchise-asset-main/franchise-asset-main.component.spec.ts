import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchiseAssetMainComponent } from './franchise-asset-main.component';

describe('FranchiseAssetMainComponent', () => {
  let component: FranchiseAssetMainComponent;
  let fixture: ComponentFixture<FranchiseAssetMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FranchiseAssetMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FranchiseAssetMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

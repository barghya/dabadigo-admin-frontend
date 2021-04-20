import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FsqSearchAssetInventoryComponent } from './fsq-search-asset-inventory.component';

describe('FsqSearchAssetInventoryComponent', () => {
  let component: FsqSearchAssetInventoryComponent;
  let fixture: ComponentFixture<FsqSearchAssetInventoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FsqSearchAssetInventoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FsqSearchAssetInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

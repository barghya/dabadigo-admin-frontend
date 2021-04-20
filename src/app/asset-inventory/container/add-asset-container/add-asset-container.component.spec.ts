import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAssetContainerComponent } from './add-asset-container.component';

describe('AddAssetContainerComponent', () => {
  let component: AddAssetContainerComponent;
  let fixture: ComponentFixture<AddAssetContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAssetContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAssetContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

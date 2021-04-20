import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAssetContainerComponent } from './edit-asset-container.component';

describe('EditAssetContainerComponent', () => {
  let component: EditAssetContainerComponent;
  let fixture: ComponentFixture<EditAssetContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAssetContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAssetContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

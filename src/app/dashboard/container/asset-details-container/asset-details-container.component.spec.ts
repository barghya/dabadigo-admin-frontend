import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetDetailsContainerComponent } from './asset-details-container.component';

describe('AssetDetailsContainerComponent', () => {
  let component: AssetDetailsContainerComponent;
  let fixture: ComponentFixture<AssetDetailsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetDetailsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetDetailsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

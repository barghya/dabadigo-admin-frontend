import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetMainContainerComponent } from './asset-main-container.component';

describe('AssetMainContainerComponent', () => {
  let component: AssetMainContainerComponent;
  let fixture: ComponentFixture<AssetMainContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetMainContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetMainContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
